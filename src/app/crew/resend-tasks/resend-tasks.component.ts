import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { AlertService } from 'src/app/shared/alert';
import { tasks } from './scheduled.tasks';

@Component({
  selector: 'app-resend-tasks',
  templateUrl: './resend-tasks.component.html',
  styleUrls: ['./resend-tasks.component.scss']
})
export class ResendTasksComponent implements OnInit {

  public events = tasks;

  constructor(private task  : TasksService,
              private alert : AlertService) { }

  ngOnInit(): void {
  }

  public resend(link : string){
    setTimeout(() => {
      this.alert.info('Solicitando ejecución de tarea ...')
      window.scroll(0,0);      
    }, 10);
    this.task.resendTask(link)
    .subscribe(resp=>{
      setTimeout(() => {
        if(resp){
          this.alert.success('Tarea ejecutada exitosamente');
        }else{
          this.alert.error('La tarea no se ha completado con éxito');
        }
      }, 1800);
    },error=>{
      setTimeout(() => {
        this.alert.error('No se ha podido ejecutar la tarea');        
      }, 1800);
    });
  }

}
