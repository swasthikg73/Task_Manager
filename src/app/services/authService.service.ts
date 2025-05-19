import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { authResponse } from "../Model/authResponse";
import { catchError, Subject, tap, throwError } from "rxjs";
import { User } from "../Model/User";

@Injectable({
    providedIn: 'root'
})
export class authService {
    http: HttpClient = inject(HttpClient);
    user = new Subject<User>()

    signup(email: string, password: string) {
        let data = { email: email, password: password, returnSecureToken: true }
        return this.http.post<authResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZQOeazangux3NN8STjj1JPjcVa6IN0Mc', data)
    }

    login(email: string, password) {
        let data = { email: email, password: password }
        return this.http.post<authResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAZQOeazangux3NN8STjj1JPjcVa6IN0Mc', data)
    }

    private handleUser(res) {
        const expiresTimestamp = new Date().getTime() + +res.expiresIn * 1000;
        const expiresIn = new Date(expiresTimestamp);
        const user = new User(res.email, res.localId, res.idToken, expiresIn)
        this.user.next(user);
    }

    private HandleError(err: HttpErrorResponse) {
        const error = err.error.error.message;
        let errrorMessage;
        switch (error) {
            case 'EMAIL_EXISTS':
                errrorMessage = 'Email is already exists';
                break;

            case 'OPERATION_NOT_ALLOWED':
                errrorMessage = 'This operation is not Allowed';
                break;

            default: errrorMessage = "An unknown error occured"
        }
        return throwError(() => errrorMessage)
    }
}