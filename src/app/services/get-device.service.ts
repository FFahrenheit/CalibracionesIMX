import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class GetDeviceService {

  private device = null;
  private errorMessage = '';

  constructor(private http    : HttpClient,
              private router  : Router) { }

  public loadDevice(id? : string, isGuard = false){
    this.device = null;
    return this.http.get(`${ base_url }/device/${ id }`)
              .pipe(
                map((resp:any) =>{
                  console.log(resp);
                  if(resp['ok']){
                    this.device = resp['equipo'];
                    this.device.siguiente = this.device.siguiente.split('T')[0];
                    this.device.aviso = this.device.aviso.split('T')[0];
                    this.device.ultima = this.device.ultima.split('T')[0];
                    
                    return true;
                  }
                  this.errorMessage = resp['error'];
                  if(isGuard){
                    this.router.navigate(['404']);
                  }
                  return false;
              }),
              catchError(error=>{
                this.errorMessage = 'Error de servidor';
                return of(false);
              }));
  }

  public getDevice(){
    return this.device;
  }

  public getError(){
    return this.errorMessage;
  }

  public downloadFiles(file : string){
    file = file.replace(/\\/g,'*');
    return encodeURI(`${ base_url }/files/${ file }`);
  }

  public downloadFile(file : string){
    file = file.replace(/\\/g,'*');
    return encodeURI(`${ base_url }/file/${ file }`);
  }
}
