import { CreateTaskComponent } from './create-task/create-task.component';
import { TaskService } from './../services/TaskService.service';
import { Component, OnInit, inject } from '@angular/core';
import { Task } from '../Model/Task';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  showCreateTaskForm: boolean = false;
  http: HttpClient = inject(HttpClient);
  ShowDetails: boolean = false;
  ShowEditTaskForm: boolean = false;
  task: Task;
  Tasks = [];
  SelectedTask: Task;
  TaskService: TaskService = inject(TaskService);
  isloading: boolean = false;
  errorMessage: string | null;
  errorSub: Subscription;
  router: Router;

  ngOnInit(): void {
    this.fetchALlTasks();
    this.errorSub = this.TaskService.errorService.subscribe({
      next: (err) => {
        this.handleError(err);
      }
    })
  }

  OpenCreateTaskForm() {
    this.showCreateTaskForm = true;
  }

  CloseTaskForm() {
    this.showCreateTaskForm = false;
  }

  CreateTask(taskData: Task) {
    this.TaskService.CreateTask(taskData);
  }


  fetchTasks() {
    this.fetchALlTasks()
    //window.location.reload();
  }

  private fetchALlTasks() {
    this.isloading = true;
    this.TaskService.fetchALlTasks().subscribe({
      next: (tasks) => {
        this.Tasks = tasks;
        this.isloading = false;
      }, error: (err) => {
        this.handleError(err)
        this.isloading = false;
      }
    });
  };

  private handleError(err: HttpErrorResponse) {
    if (err.error.error === 'Permission denied') {
      this.errorMessage = "You don't have permission to perform this action";
    }
    else if (err.error.error === '404 Not Found') {
      this.errorMessage = "Invalid Url"
    }
    setTimeout(() => {
      this.errorMessage = null;
    }, 3000);

  }

  showTaskDetail(task: Task) {
    this.task = task;
    this.ShowDetails = true;
  }

  CloseTaskDetail() {
    this.ShowDetails = false;
  }

  DeleteTask(id: any) {
    this.TaskService.DeleteTask(id);
    this.fetchALlTasks();
  }


  DeleteAll() {
    this.TaskService.DeleteAll();
    this.fetchALlTasks();
  }

  EditDetails(id: string) {
    this.ShowEditTaskForm = true;
    this.Tasks.forEach((task) => {
      if (id == task.id) {
        this.SelectedTask = task
      }
    });
  }

  closeEditDetails() {
    this.ShowEditTaskForm = false;
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}
