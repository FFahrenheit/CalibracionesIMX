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
                        user.position,
                        user.name
                      );

                      if(user['recover']){
                        return null;
                      }

                      return true;
                      
                    }else{
                      return false;
                    }
                  }),catchError(error=>{
                    console.log(error);
                    return of(false);
                  })
                );
  }

  public getLoggedUser() : User | undefined{
    return this.user;
  }

  isLogged() : boolean{
    return this.validate('username') && this.validate('email') 
    && this.validate('token') && this.validate('posicion');
  }

  private validate(name : string){
    let field = localStorage.getItem(name);
    console.log(field);
    return field != "" && field != "undefined" && field != null;
  }

  public refresh(state : RouterStateSnapshot){
    if(!this.isLogged()){
      this.router.navigate(['inicio','login'],{ queryParams: { returnUrl: state.url }});
    }

    return this.http.post(`${ base_url }/auth/refresh`,{})
               .pipe(
                 map((resp:any)=>{
                   
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
                        user.position,
                        user.name
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
    this.user = Object.create(null);
  }

}
