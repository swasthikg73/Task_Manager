import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Task } from 'src/app/Model/Task';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  TaskForm : FormGroup;

  @Output()
  taskData:EventEmitter<Task>  = new EventEmitter<Task>();

  ngOnInit(): void {
  // this.TaskForm = new FormGroup({
  //   title : new FormControl('', null),
  //   description : new FormControl('', null),
  //   assignedTo : new FormControl('', null),
  //   createdAt : new FormControl('', null),
  //   priority :new FormControl('', null),
  //   status :new FormControl('', null)
  // })
  }
  @Output()
  CloseForm: EventEmitter<boolean>= new EventEmitter<boolean>();

  OnCloseForm(){
    this.CloseForm.emit(false);
  }

  OnSubmit(submitForm : NgForm){
    this.taskData.emit(submitForm.value);
    this.CloseForm.emit(false);
    // console.log(submitForm?.value);
  }

}
