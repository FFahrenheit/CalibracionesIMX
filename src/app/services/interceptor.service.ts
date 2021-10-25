import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const maintenance = environment.maintenance;

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  private retryCount: number;

  constructor(private router: Router) {
    this.retryCount = 0;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (maintenance) {
      this.router.navigate(['503']);
    }

    const token = localStorage.getItem('token') || "";
    let tokenizedRequest = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token
      }
    });

    return next.handle(tokenizedRequest).pipe(
      catchError((error: any) => {
        if (error.status == 0) {
          this.retryCount += 1;
          console.log('Error: ' + this.retryCount + ' retries');
          if (this.retryCount >= 4) {
            this.router.navigate(['500'])
          }
        }
        console.warn(error);
        return throwError('Error');
      }));
  }
}
