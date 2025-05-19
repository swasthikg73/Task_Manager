import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { authService } from '../services/authService.service';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { authResponse } from '../Model/authResponse';
import { User } from '../Model/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  islogginMode: boolean = true;
  authService: authService = inject(authService);
  isloading: boolean = false;
  errorMessage: string | null = null;
  routes: Router = inject(Router);
  authObs: Observable<authResponse>;

  SwithMode() {
    this.islogginMode = !this.islogginMode;
  }

  OnSubmit(form: NgForm) {
    let email = form.value.email;
    let password = form.value.password;

    if (this.islogginMode) {
      this.isloading = true;
      this.authObs = this.authService.login(email, password);
    } else {
      this.authObs = this.authService.signup(email, password)
    }
    this.authObs.subscribe({
      next: (res) => {
        // console.log(res);
        localStorage.setItem('Dummyawttoken', res.idToken)
        this.routes.navigateByUrl('/dashboard');
      },
      error: (err) => {
        let errorMsg = err.error.error.message;
        console.log("Error Found", errorMsg);

        this.errorMessage = errorMsg;
        this.hideSnackBar();
      }
    });

    this.isloading = false;
    form.reset();
  }

  On

  hideSnackBar() {
    setTimeout(() => {
      this.errorMessage = null;
    }, 3000);
  }
}
