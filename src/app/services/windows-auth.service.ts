import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AlertService } from '../shared/alert';
import { ChangePasswordService } from './change-password.service';
import { LoginService } from './login.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class WindowsAuthService {

  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImkubG9wZXoiLCJpYXQiOjE2MzUxNzgxNjJ9.knGZKKWMhu4Uvdz_zzgjfes-pMwDXMBqwdNiuBsRh6k";
  constructor(private router  : Router,
              private route   : ActivatedRoute,
              private auth    : LoginService,
              private change  : ChangePasswordService,
              private alert   : AlertService) { }

  public init() {
    const token = this.route.snapshot.queryParams['token'];
    const error = this.route.snapshot.queryParams['error'];
    localStorage.setItem('token', token);

    if(!token || token == ''){
      switch(error){
        case 'forbidden':
          this.alert.error("No puede iniciar sesión, debe pertenecer al dominio INTERPLEX");
          break;
        default:
          break;
      }
      return;
    }

    const state = localStorage.getItem('returnUrl') || '/';

    console.log({
      token,
      state
    });

    this.auth.refresWindows().subscribe(resp => {
      if (resp == null) {
        this.change.activateGuard();
        this.router.navigate(['usuarios','seguridad','cambiar']);
      } else if (resp == true) {
        this.alert.success('Autenticación correcta');
        setTimeout(() => {
          this.router.navigateByUrl(state);          
        }, 3000);
      } else {
        this.alert.error('No se pudo completar la autenticación');
      }
    });
  }

  public login() {
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