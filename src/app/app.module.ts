import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateTaskComponent } from './dashboard/create-task/create-task.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TaskDetailsComponent } from './dashboard/task-details/task-details.component';
import { EditTaskComponent } from './dashboard/edit-task/edit-task.component';
import { LoginComponent } from './login/login.component';
import { AppRouterModule } from './services/router.module';
import { LoaderComponent } from './Utilities/loader/loader.component';
import { SnackbarComponent } from './Utilities/snackbar/snackbar.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    CreateTaskComponent,
    TaskDetailsComponent,
    EditTaskComponent,
    LoginComponent,
    LoaderComponent,
    SnackbarComponent,
    HomeComponent
  ],
  imports: [
    AppRouterModule,
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
