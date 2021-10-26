import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private user : User | undefined;
  private errorMessage : string = '';

  constructor(private http    : HttpClient,
              private router  : Router) { }

  public login(username: string, password: string) {
    let form = { username, password};

    return this.http.post(`${base_url}/auth/login`,form)
                .pipe(
                  map((resp : any)=>{

                    console.log(resp);

                    if(resp['ok']){
                      let user = resp.usuario;

                      localStorage.setItem('username',user.username);
                      localStorage.setItem('token',resp.token);
                      localStorage.setItem('email',user.email); 
                      localStorage.setItem('posicion',user.posicion);
                      
                      this.user = new User(
                        user.username,
                        user.email,
                        user.posicion,
                        user.nombre
                      );

                      if(user['recover']){
                        return null;
                      }

                      return true;
                      
                    }else{
                      this.errorMessage = resp.error;
                      return false;
                    }
                  }),catchError(error=>{
                    console.log(error);
                    this.errorMessage = 'Error de servidor';
                    return of(false);
                  })
                );
  }

  public getLoggedUser() : User | undefined{
    return this.user;
  }

  public isAdmin() : boolean{
    return this.user.posicion == 'encargado';
  }

  public isLender() : boolean{
    return this.user.posicion == 'prestador';
  }

  public isLogged() : boolean{
    return this.validate('username') && this.validate('email') 
    && this.validate('token') && this.validate('posicion');
  }

  private validate(name : string){
    let field = localStorage.getItem(name);
    return field != "" && field != "undefined" && field != null;
  }

  public getError() : string{
    return this.errorMessage;
  }

  public refresh(state : RouterStateSnapshot | any){
    
    if(!this.isLogged()){
      this.router.navigate(['inicio','login'],{ queryParams: { returnUrl: state.url }});
    }

    return this.http.post(`${ base_url }/auth/refresh`,{})
               .pipe(
                 map((resp:any)=>{
                   
                  if(resp['ok']){

                      let user = resp.usuario;

                      localStorage.setItem('username',user.username);
                      localStorage.setItem('token',resp.token);
                      localStorage.setItem('email',user.email); 
                      localStorage.setItem('posicion',user.posicion);
                      
                      this.user = new User(
                        user.username,
                        user.email,
                        user.posicion,
                        user.nombre
                      );
 
                    return true;
                  }else{
                    this.router.navigate(['inicio','login'],{ queryParams: { returnUrl: state.url }});
                    return false;
                  }}),
                 catchError(error=>{
                  this.router.navigate(['inicio','login'],{ queryParams: { returnUrl: state.url }});
                  return of(false);
                 })
               );
  }

  public logout(){
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('position');
    localStorage.removeItem('email');
    sessionStorage.setItem('index','0')
    this.user = Object.create(null);
  }

  public recoverPassowrd(username : string){
    return this.http.post(`${ base_url }/auth/recover`, { username })
               .pipe(
                 map(resp=>{
                   if(resp['ok']){
                     return true;
                   }
                   this.errorMessage = resp['error'] || 'No se pudo procesar la solicitud';
                   return false;
                 }),catchError(err=>{
                   this.errorMessage = 'Error de servidor';
                   return of(false);
                 })
               );
  }

}
