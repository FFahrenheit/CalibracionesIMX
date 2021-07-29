import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  private error = 'Error de servicio';

  constructor(private http  : HttpClient,
              private login : LoginService) { }

  public deleteRecord(table : string, id : number){

    return this.http.delete(`${base_url}/admin/${table}/${id}`);
  }

  public getError() : string{
    return this.error;
  }
}
