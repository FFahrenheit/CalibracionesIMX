import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  private devicesList = [];

  private errorMessage = 'Error de servidor';

  constructor(private http  : HttpClient) { }

  public loadDevices(body = null){
    let query = this.applyFilters(body);

    return this.http.get(`${ base_url }/devices/all${ query }`)
                .pipe(
                  map((resp:any)=>{
                    console.log(resp);
                    if(resp.ok){
                      this.devicesList = resp['equipos'];
                      return true;
                    }
                    this.errorMessage = 'No se encontraron coincidencias';
                    return false;
                  }),
                  catchError(error=>{
                    console.log(error);
                    this.errorMessage = 'Error en el servidor';
                    return of(false);
                  })
                );
  }

  private applyFilters(obj) : string{
    if(obj == null){
      return '';
    }
    let filters = [];

    Object.keys(obj).forEach(k=>{
      let query = k + '=' + obj[k];
      filters.push(query);
    });

    if(filters.length != 0){
      return filters.join('&');
    }
    return '';
  }

  public getDevices(){
    return this.devicesList;
  }

  public getError(){
    return this.errorMessage;
  }
}
