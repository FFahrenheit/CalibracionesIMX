import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UploadCertificateService } from './upload-certificate.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  private loadedProviders;
  private errorMessage = 'Error de servicio';

  constructor(private http    : HttpClient,
              private upload  : UploadCertificateService) { }

  public loadProviders(){
    return this.http.get(`${base_url}/providers`)
               .pipe(
                 map(resp=>{
                   console.log(resp);
                   if(resp['ok']){
                    this.loadedProviders = resp['proveedores'];
                    return true;
                   }
                   this.errorMessage = 'No se pudieron obtener los proveedores';
                   return false;
                 }),catchError(err=>{
                  this.errorMessage = 'No se pudo conectar al servidor';
                  return of(false);
                 })
               );
  }

  public updateProviders(providers,deleted){
    let body = {
      providers,
      deleted
    };

    return this.http.put(`${base_url}/providers`, body)
               .pipe(
                 map(resp=>{
                  if(resp['ok']){
                    return this.upload.uploadCertificate(providers)
                    .subscribe(resp=>{
                      return resp;
                    },error=>{
                      return false;
                    });
                   }
                   this.errorMessage = 'No se pudieron obtener los proveedores';
                   return false;
                 }),catchError(err=>{
                  this.errorMessage = 'No se pudo conectar al servidor';
                  return of(false);
                 })
               );
  }

  public getError() : string{
    return this.errorMessage;
  }

  public getProviders(){
    return this.loadedProviders;
  }

}
