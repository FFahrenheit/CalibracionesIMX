import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private http: HttpClient) { }

  public resendDailyExpired(){
    return this.resendTask('expired');
  }

  public resendDailyNotice(){
    return this.resendTask('notice');
  }

  public resendMonthlyReport(){
    return this.resendTask('monthly');
  }

  public resendManagerAdvise(){
    return this.resendTask('advise');
  }

  public dailyBackup(){
    return this.resendTask('backup/daily');
  }

  public weeklyBackup(){
    return this.resendTask('backup/weekly');
  }

  private resendTask(task : string){
    return this.http.get(`${base_url}/tasks/${task}`)
              .pipe(
                map(resp=>{
                  return resp['ok'];
                }), catchError( err =>{
                  console.log(err);
                  return of(false);
                })
              );
  }
}
