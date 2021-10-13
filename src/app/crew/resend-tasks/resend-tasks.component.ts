import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { tasks } from './scheduled.tasks';

@Component({
  selector: 'app-resend-tasks',
  templateUrl: './resend-tasks.component.html',
  styleUrls: ['./resend-tasks.component.scss']
})
export class ResendTasksComponent implements OnInit {

  public events = tasks;

  constructor(private task : TasksService) { }

  ngOnInit(): void {
  }

}
