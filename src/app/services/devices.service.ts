import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
  private filters : any[] = [];

  constructor(private http    : HttpClient,
              private router  : Router) { }

  public loadDevices(body = null, route = 'all'){
    let query = this.applyFilters(body);

    return this.http.get(`${ base_url }/devices/${route}${ query }`)
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
    if(obj === null){
      return '';
    }
    this.filters[this.router.url] = obj;

    let filters = [];

    Object.keys(obj).forEach(k=>{
      let query = k + '=' + obj[k];
      filters.push(query);
    });

    if(filters.length != 0){
      return '?'+filters.join('&');
    }
    return '';
  }

  public getDevices(){
    return this.devicesList;
  }

  public getError(){
    return this.errorMessage;
  }

  public getSavedFilters(){
    return this.filters[this.router.url] || {};
  }
}
