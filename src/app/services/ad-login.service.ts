import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { LoginService } from './login.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AdLoginService {

  private errorMessage = 'Error de servicio';
  private http : HttpClient;

  constructor(private handler : HttpBackend,
              private login   : LoginService) { 
    this.http = new HttpClient(this.handler);
  }

  public saveCredentials(resp){
    let user = resp['usuario'];

    localStorage.setItem('username',user.username);
    localStorage.setItem('token',resp['token']);
    localStorage.setItem('email',user.email); 
    localStorage.setItem('posicion',user.posicion);

    this.login.setUser(
      new User(
        user.username, 
        user.email,
        user.posicion,
        user.nombre)
    );

    if(user['recover']){
      return null;
    }

    return true;
  }

  public connectWithSSO(){
    return this.http.get(`${ base_url }/auth/sso`,{
      withCredentials: true
    }).pipe(
        map(resp=>{
          console.log(resp);
          
          if(resp['ok']){
            return this.saveCredentials(resp);
          }

          this.errorMessage = resp['error'] || 'Error al realizar petición';
          return false;
        }),
        catchError(error=>{
          this.errorMessage = 'No se pudo autenticar con el servidor';
          return of(false);
        })
      );
  }

  public connectWithCredentials(login : string, password : string){
    return this.http.post(`${ base_url }/auth/sso`, {
      login,
      password
    }).pipe(
      map(resp => {
        console.log(resp);

        if(resp['ok']){
          return this.saveCredentials(resp);
        }

        this.errorMessage = resp['error'] || 'Error al realizar petición';
        return false;
      }), catchError(err=> {
        console.log(err);
        this.errorMessage = 'No se pudo autenticar con el servidor';
        return of(false);
      })
    );
  }

  public getError(){
    return this.errorMessage;
  }
}
