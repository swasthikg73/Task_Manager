import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {

  @Input()
  task: any;

  @Output()
  CloseDetails: EventEmitter<boolean> = new EventEmitter<boolean>();

  Closedetails() {
    console.log(this.task.title);
    this.CloseDetails.emit(false);
  };

}
