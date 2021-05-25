import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private user : User = Object.create(null);

  constructor(private http: HttpClient) { }

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
                      localStorage.setItem('token',user.position);
                      
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

  public getLoggedUser() : User{
    return this.user;
  }

  public isLogged() : boolean{
    return this.user.username != null;
  }
}
