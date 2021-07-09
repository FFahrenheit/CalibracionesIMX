import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CrewService {

  private managers;
  private errorMessage = 'Error de servicio';

  constructor(private http  : HttpClient) { }

  public addUser(user){
    return this.http.post(`${base_url}/users`,{ user })
    .pipe(
      map(resp=>{
        console.log(resp);
        if(resp['ok']){
          return true;
        }
        this.errorMessage = 'No se pudo agregar, verifique que el usuario no exista';
        return false;
      }),
      catchError(error=>{
        this.errorMessage = 'Error. No se pudo agregar el usuario, verifique sus campos';
        return of(false);
      })
    );
  }

  public updateEncargados(managerList){
    return this.http.put(`${base_url}/mandated`,{ users : managerList})
    .pipe(
      map(resp=>{
        console.log(resp);
        if(resp['ok']){
          return true;
        }
        this.errorMessage = 'No se han podido actualizar los encargados';
        return false;
      }),
      catchError(error=>{
        this.errorMessage = 'Error de servidor';
        return of(false);
      })
    );
  }

  public loadEncargados(){
    return this.http.get(`${base_url}/mandated`)
              .pipe(
                map(resp=>{
                  console.log(resp);
                  if(resp['ok']){
                    this.managers = resp['usuarios'];
                    return true;
                  }
                  return false;
                }),
                catchError(error=>{
                  return of(false);
                })
              );
  }

  public getEncargados(){
    return this.managers;
  }

  public getError(){
    return this.errorMessage;
  }
}
