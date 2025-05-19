import { DashboardComponent } from './../dashboard/dashboard.component';
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "../login/login.component";
import { NgModule } from "@angular/core";
import { HomeComponent } from "../home/home.component";

const route: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home', component: HomeComponent },
  { path: '', component: DashboardComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(route)],
  exports: [RouterModule],
  providers: []
})
export class AppRouterModule { }