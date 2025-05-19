import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Task } from "../Model/Task";
import { map, Observable, Subject } from 'rxjs';


@Injectable({
    providedIn :"root"
})
export class TaskService {
  http:HttpClient = inject(HttpClient);
  Tasks=[];
  errorService = new Subject<HttpErrorResponse>();
    
  CreateTask(task :Task){
    this.http.post<{name:string}>('https://http-demo-7aeff-default-rtdb.firebaseio.com/tasks.json',task)
    .subscribe({error:(err) => {
      this.errorService.next(err);
    }});
  }
    
  fetchALlTasks() {
    let header = new HttpHeaders();
    header = header.set('content-type','application/json');
    header = header.set('content-type', 'text/html');

    let queryParams = new HttpParams();
    queryParams = queryParams.set('page',1);
    queryParams = queryParams.set('limit', 10);

    return this.http.get<{[key:string]:Task}>('https://http-demo-7aeff-default-rtdb.firebaseio.com/tasks.json', {headers:header,params:queryParams}).
      // Converting Object to Array (response) 
    pipe(map((response)=> {
      let tasks = [];
 
       for(let key in response){
         if(response.hasOwnProperty(key)){
           tasks.push({...response[key], id:key})
         }
       }
       
       return tasks;
     }))   
    };

    fetchTasks(){
      this.fetchALlTasks().subscribe(()=>{})
    }

    DeleteTask(taskid:String){
        this.http.delete('https://http-demo-7aeff-default-rtdb.firebaseio.com/tasks/'+taskid+'.json').subscribe({error:(err)=>{
          this.errorService.next(err);
        }
      });
    };

    DeleteAll(){
        this.http.delete('https://http-demo-7aeff-default-rtdb.firebaseio.com/tasks.json').subscribe(()=>{   
        })
    };

    UpdateTask (id:any, data:any){
      this.http.put('https://http-demo-7aeff-default-rtdb.firebaseio.com/tasks/'+id+'.json', data).subscribe(()=>{
        });
    }
}