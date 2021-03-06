import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class GetBorrowService {
  private device = null;
  private errorMessage = '';

  constructor(private http: HttpClient) { }

  public loadDevice(id? : string){
    this.device = null;
    return this.http.get(`${ base_url }/borrows/${ id }`)
              .pipe(
                map((resp:any) =>{
                  console.log(resp);
                  if(resp['ok']){
                    this.device = resp['equipo'];
                    // this.device.siguiente = this.device.siguiente.split('T')[0];
                    // this.device.aviso = this.device.aviso.split('T')[0];
                    // this.device.ultima = this.device.ultima.split('T')[0];
                    
                    return true;
                  }
                  this.errorMessage = resp['error'];
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

  public downloadFile(file : string){
    file = file.replace(/\\/g,'*');
    return encodeURI(`${ base_url }/files/${ file }`);
  }
}
