import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeDashboardComponent} from "./employe-dashboard/employe-dashboard.component";
import {WelcomeComponent} from "./welcome/welcome.component";

const routes: Routes = [
  {path : '' , component : WelcomeComponent,pathMatch : 'full'},
  {path : 'employee' , component : EmployeDashboardComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
