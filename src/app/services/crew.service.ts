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

  constructor(private http  : HttpClient) { }

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
              )
  }

  public getEncargados(){
    return this.managers;
  }
}
