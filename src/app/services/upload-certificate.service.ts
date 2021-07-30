import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UploadCertificateService {

  constructor(private http: HttpClient) { }

  public uploadFiles(equipo : string, id : string, certificate : File, ryr : File, resource : File){
    let calls = [];

    if(certificate){
      let headers = new HttpHeaders();
      headers.set('Content-Type','multipart/form-data');
      let formData = new FormData();
      formData.append('certificate',certificate);
  
      calls.push(this.http.post(
        `${base_url}/upload/certificate/${equipo}/${id}`,
        formData,
        {
          headers: headers
        }
      ));    
    }

    if(ryr){
      let headers = new HttpHeaders();
      headers.set('Content-Type','multipart/form-data');
      let formData = new FormData();
      formData.append('ryr',ryr);
  
      calls.push(this.http.post(
        `${base_url}/upload/ryr/${equipo}/${id}`,
        formData,
        {
          headers: headers
        }
      ));
    }

    if(resource){
      let headers = new HttpHeaders();
      headers.set('Content-Type','multipart/form-data');
      let formData = new FormData();
      formData.append('resource',resource);
  
      calls.push(this.http.post(
        `${base_url}/upload/resource/${equipo}/foo`,
        formData,
        {
          headers: headers
        }
      ));
    }

    console.log(calls);

    if (calls.length == 0) {
      return of(true);
    }

    return forkJoin(calls).pipe(
      map(resps => {
        console.log(resps);
        let count = 0;
        resps.forEach(r => {
          count += r['ok'];
        });
        return count == resps.length;

      }, catchError(e => {
        console.log('Error');
        return of(false);
      }))
    );
    
  }

  public uploadCertificate(proveedores){
    console.log(proveedores);
    let calls = [];

    proveedores.forEach(p=> {
      if(p.certificado && p.new){
        const url = `${base_url}/upload/iso/${p.nombre}`;

        let headers = new HttpHeaders();
        headers.set('Content-Type', 'multipart/form-data');
        
        let formData = new FormData();
        formData.append('iso', p.certificado);
        
        calls.push(this.http.post(url, formData, {headers: headers})); 
      }
    });

    console.log(calls);

    if (calls.length == 0) {
      return of(true);
    }

    return forkJoin(calls).pipe(
      map(resps => {
        console.log(resps);
        let count = 0;
        resps.forEach(r => {
          count += r['ok'];
        });
        return count == resps.length;

      }, catchError(e => {
        console.log('Error');
        return of(false);
      }))
    );
  }

  public uploadCertificates(certificados, id) {
    console.log(certificados);
    let calls = [];

    certificados.forEach(c => {
      if (c.certificado && !c?.id) {
        const url = `${base_url}/upload/iso/${id}/${c.nombre}`;
        
        let headers = new HttpHeaders();
        headers.set('Content-Type', 'multipart/form-data');
        
        let formData = new FormData();
        formData.append('iso', c.certificado);
        
        calls.push(this.http.post(url, formData, {headers: headers}));
      }
    });

    console.log(calls);

    if (calls.length == 0) {
      return of(true);
    }

    return forkJoin(calls).pipe(
      map(resps => {
        console.log(resps);
        let count = 0;
        resps.forEach(r => {
          count += r['ok'];
        });
        return count == resps.length;

      }, catchError(e => {
        console.log('Error');
        return of(false);
      }))
    );
  }

}
