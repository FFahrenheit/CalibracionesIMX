import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BorrowsService {

  private errorMessage = 'Server error'; 

  constructor(private http  : HttpClient) { }

  public returnDevice(id : string, estado : string, notas = '', fecha = new Date()){
    const body = {
      id,
      estado,
      notas,
      fecha
    };
    
    return this.http.put(`${ base_url }/borrow`,body)
    .pipe(
      map((resp : any) => {
        if(resp['ok']){
          return true;
        }
        this.errorMessage = 'No se pudo prestar el equipo';
        return false;
      }),
      catchError((error: any)=>{
        this.errorMessage = 'Error en el servidor, intente de nuevo';
        return of(false);
      })
    ); 
  }

  public borrowDevice(id : string, prestatario : string, compromiso, fecha = new Date()){
    const body = {
      id,
      prestatario,
      compromiso,
      fecha //Saltarse el prestador porque se sabe por el token
    };

    return this.http.post(`${ base_url }/borrow`,body)
              .pipe(
                map((resp : any) => {
                  if(resp['ok']){
                    return true;
                  }
                  this.errorMessage = 'No se pudo prestar el equipo';
                  return false;
                }),
                catchError((error: any)=>{
                  this.errorMessage = 'Error en el servidor, intente de nuevo';
                  return of(false);
                })
              );
  }

  public getError(){
    return this.errorMessage;
  }
}
