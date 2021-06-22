import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UpdateDeviceService {

  private calibrationId;
  private errorMessage = 'Error de servidor';

  constructor(private http: HttpClient) { }

  public acceptCalibration(equipo : string, calibrador = 'N/I', fecha = new Date()){
    const data = {
      equipo,
      fecha,
      calibrador
    };
 
    return this.http.post(`${base_url}/device/calibrated`, data)
              .pipe(
                map((resp:any)=>{
                  console.log(resp);
                  if(resp['ok']){
                    this.calibrationId = resp['id'];
                    return true;
                  }

                  this.errorMessage = 'No se pudo completar la operación';
                  return false;
                }),catchError(error=>{
                  console.log(error);
                  this.errorMessage = 'Error con el servidor';
                  return of(false);
                })
              );
  }

  public uploadRyr(equipo : string, file : File){
    console.log(file)
    let headers = new HttpHeaders();
    headers.set('Content-Type','multipart/form-data');
    let formData = new FormData();
    formData.append('ryr',file);

    return this.http.post(
      `${base_url}/upload/ryr/${equipo}/${this.calibrationId}`,
      formData,
      {
        headers: headers
      }
    );
  }

  public uploadCertificate(equipo : string, file : File){
    console.log(file);
    let headers = new HttpHeaders();
    headers.set('Content-Type','multipart/form-data');
    let formData = new FormData();
    formData.append('certificate',file);

    return this.http.post(
      `${base_url}/upload/certificate/${equipo}/${this.calibrationId}`,
      formData,
      {
        headers: headers
      }
    );
  }

  public updateStatus(id : string, estado : string){
    const data = {
      estado,
      updateActive: !estado.includes('alibraci')       //[C]alibraci[ón], [c]alibraci[on]
    };

    return this.http.put(`${base_url}/device/status/${ id }`,data)
              .pipe(
                map((resp:any)=>{
                  console.log(resp);
                  if(resp['ok']){
                    return true;
                  }

                  this.errorMessage = 'No se pudo completar la operación';
                  return false;
                }),catchError(error=>{
                  console.log(error);
                  this.errorMessage = 'Error con el servidor';
                  return of(false);
                })
              );
  }

  public geError() : string{
    return this.errorMessage;
  }
}
