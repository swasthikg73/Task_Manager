import { Router } from '@angular/router';
import { User } from '../Model/User';
import { authService } from './../services/authService.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  istoken = localStorage.getItem('Dummyawttoken');
  isloggedIn: boolean = false;
  authService: authService = inject(authService);
  routes: Router = inject(Router);

  constructor() {
    this.isloggedIn = localStorage.getItem('Dummyawttoken') ? true : false;
    console.log(this.isloggedIn);
  }
  ngOnInit(): void {

    // this.authService.user.subscribe((user:User) => {    
    //   this.isloggedIn = user? true :false;
    // })

    // this.isloggedIn = localStorage.getItem('Dummyawttoken') ? true : false;
    // console.log(this.isloggedIn);
  }

  UserLogged(res: boolean) {
    this.isloggedIn = res;
  }

  ngOnDestroy() {
    this.authService.user.unsubscribe();
  }

  ngOnChanges() {
    this.isloggedIn = localStorage.getItem('Dummyawttoken') ? true : false;
    console.log(this.isloggedIn);
  }

  logout() {
    localStorage.removeItem('Dummyawttoken');
    this.routes.navigateByUrl('/login');
  }
}
