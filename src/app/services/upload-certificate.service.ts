import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UploadCertificateService {

  constructor(private http  : HttpClient) { }

  public uploadCertificates(certificados, id){
    console.log(certificados);
    let calls = [];

    certificados.forEach(c=>{
      if(c.certificado && !c?.id){
        const url = `${base_url}/device/${id}`;
        calls.push(this.http.get(url));
      }
    });

    console.log(calls);

    if(calls.length == 0){
      return of(true);
    }

    return forkJoin(calls).pipe(
      map(resps=>{
        console.log(resps);
        let count = 0;
        resps.forEach(r=>{
          count += r['ok'];
        });
        return count == resps.length;

      },catchError(e=>{
        console.log('Error');
        return of(false);
      }))
    );
  }

}
