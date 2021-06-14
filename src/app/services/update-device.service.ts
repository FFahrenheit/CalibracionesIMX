import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UpdateDeviceService {

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
