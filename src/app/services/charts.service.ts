import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ChartsService {
  private errorMessage = 'Error de servicio';
  private data;

  constructor(private http : HttpClient) { }

  public getBorrowsOverallChart(){
    return this.getChart('borrows');
  }

  public getNextChart(){
    return this.getChart('next');
  }

  public getDoneChart(){
    return this.getChart('done');
  }

  private getChart(route : string){
    return this.http.get(base_url + '/charts/' + route)
               .pipe(
                 map(resp=>{
                   if(resp['ok']){
                     this.data = resp['data'];
                     return true;
                   }
                   this.errorMessage = 'No se pudo obtener la información del gráfico';
                   return false;
                 }),catchError(err=>{
                   console.log(err);
                   this.errorMessage = 'Error de servidor';
                   return of(false);
                 })
               );
  }

  public getError() : string{
    return this.errorMessage;
  }

  public getData() : any{
    return this.data;
  }
}
