import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class WindowsAuthService {

  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImkubG9wZXoiLCJpYXQiOjE2MzUxNzgxNjJ9.knGZKKWMhu4Uvdz_zzgjfes-pMwDXMBqwdNiuBsRh6k";
  constructor(private router  : Router,
              private route   : ActivatedRoute,
              private auth    : LoginService) { }

  public init(){
    const token = this.route.snapshot.queryParams['token'];
    localStorage.setItem('token', token);
    
    const state = {
      returnUrl: localStorage.getItem('returnUrl') || ''
    }

    console.log({
      token,
      state
    })

    this.auth.refresh(state).subscribe(resp=>{
      if(resp){
        alert('Working on it');
      }
    });
  }

  public login(){
    const authRef = base_url + '/auth/win?redirect=' 
    + location.host                  // Guardamos la URL de origen
    + this.router.url.split('?')[0]; // Ignoramos los parámetros de return
    
    localStorage.setItem('returnUrl', this.route.snapshot.paramMap['returnUrl'] || '')//Pero los guardamos en localStorage
    console.log({
      authRef,
      origin: window.location.host
    });
    window.location.replace(authRef);
  }

}