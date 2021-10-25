import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class WindowsAuthService {

  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImkubG9wZXoiLCJpYXQiOjE2MzUxNzgxNjJ9.knGZKKWMhu4Uvdz_zzgjfes-pMwDXMBqwdNiuBsRh6k";
  constructor() { }

  public login(){
    const authRef = base_url + '/auth/win?redirect=' + location.host.toString();
    console.log({
      authRef,
      origin: window.location.host
    });
    window.location.replace(authRef);
  }

}