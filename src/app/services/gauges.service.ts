import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class GaugesService {

  private errorMessage = 'Error de servicio';
  private gauge : any;

  constructor(private http  : HttpClient) { }

  public loadGauge(number : string){

    return this.http.get(`${base_url}/gauges/${number}`)
               .pipe(
                 map(resp=>{
                   if(resp['ok']){
                    this.gauge = resp['device'];
                    return true;
                   }
                   this.errorMessage = 'No se pudo encontrar el Gauge con el ID especificado';
                   return false;
                 }, catchError(err=>{
                   console.log(err);
                   this.errorMessage = 'Error de servidor';
                   return of(false);
                 }))
               );
  }

  public lendGauges(operator : string, devices : string[], date = new Date()){
    const body = {
      operator,
      devices,
      date
    };

    return this.http.post(`${base_url}/gauges`, body)
               .pipe(
                 map(resp=>{
                   if(resp['ok']){
                     return true;
                   }
                   this.errorMessage = 'No se pudieron prestar los equipos';
                   return false;
                 },catchError(err=>{
                   console.log(err);
                   this.errorMessage = 'Error de servidor';
                   return of(false);
                 }))
               );
  }

  public returnGauges(operator : string, devices : string[], status : string, notes : string = '', date = new Date()){
    const body = {
      operator,
      devices,
      status,
      notes,
      date
    };

    return this.http.put(`${base_url}/gauges`, body)
               .pipe(
                 map(resp=>{
                   if(resp['ok']){
                     return true;
                   }
                   this.errorMessage = 'No se pudieron regresar los equipos';
                   return false;
                 },catchError(err=>{
                   console.log(err);
                   this.errorMessage = 'Error de servidor';
                   return of(false);
                 }))
               );
  }

  public loadGaugeDetails(number : string){

    return this.http.get(`${base_url}/gauge/${number}`)
               .pipe(
                 map(resp=>{
                   if(resp['ok']){
                    this.gauge = resp['equipo'];
                    return true;
                   }
                   this.errorMessage = 'No se pudo encontrar el Gauge con el ID especificado';
                   return false;
                 }, catchError(err=>{
                   console.log(err);
                   this.errorMessage = 'Error de servidor';
                   return of(false);
                 }))
               );
  }

  public getError() : string{
    return this.errorMessage;
  }

  public getGuage() : any{
    return this.gauge;
  }
}
