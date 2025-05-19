import { TaskService } from './../../services/TaskService.service';
import { Component, EventEmitter, Output, Input, OnInit, ViewChild, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from 'src/app/Model/Task';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  @Input()
  Selectedtask: Task;
  TaskService: TaskService = inject(TaskService);

  @Output()
  closeForm: EventEmitter<boolean> = new EventEmitter<false>;

  @ViewChild('editForm') editForm: NgForm;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.Selectedtask && this.editForm) {
        this.editForm.form.patchValue(this.Selectedtask)
      }
    },);
  }

  CloseEditForm() {
    this.closeForm.emit(false);
    // console.log("From Edit-------------------", this.Selectedtask);
  }

  UpdateTask(task: any) {
    this.TaskService.UpdateTask(task.id, this.editForm.value)
    this.CloseEditForm();
    this.TaskService.fetchTasks()
  }
}
