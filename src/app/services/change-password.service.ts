import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  private isLocked = false;
  private errorMessage = 'Error de servicio';

  constructor(private http: HttpClient) {
    this.isLocked = localStorage.getItem('locked') == '1';
  }

  public changePassword(password: string) {
    return this.http.put(`${base_url}/user/recover`, password )
      .pipe(
        map(resp => {
          console.log(resp);
          if (resp['ok']) {
            return true;
          }
          this.errorMessage = 'No se pudo actualizar la contraseña';
          return false;
        }, catchError(err => {
          console.log(err);
          this.errorMessage = 'Error de servidor';
          return of(false);
        }))
      );
  }

  public getError() : string{
    return this.errorMessage;
  }

  public activateGuard() {
    this.isLocked = true;
    localStorage.setItem('locked', '1');
  }

  public deactivateGuard() {
    this.isLocked = false;
    localStorage.removeItem('locked');
  }

  public canNavigate() {
    return !this.isLocked;
  }
}
