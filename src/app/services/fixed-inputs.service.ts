import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FixedInputsService {

  private result = Object.create(null);
  private errorMessage = 'Error de servicio';

  constructor(private http : HttpClient) { }

  public loadLocations(){
    return this.loadValues('ubicacion');
  }

  public getLocations(){
    return this.getResult('ubicacion');
  }

  private loadValues(param : string){
    return this.http.get(`${base_url}/devices/parameter/${param}`)
              .pipe(
                map(resp =>{
                  console.log(resp);
                  if(resp['ok']){
                    this.result[param] = resp[param];
                    return true;
                  }
                  this.errorMessage = 'No se pudieron obtener los valores';
                  return false;
                }),catchError(err=>{
                  console.log(err);
                  this.errorMessage = 'Error de servidor';
                  return of(false);
                })
              );
  }

  public getError(){
    return this.errorMessage;
  }

  private getResult(param : string){
    return this.result[param];
  }
}
