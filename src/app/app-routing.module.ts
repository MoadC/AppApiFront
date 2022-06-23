import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeDashboardComponent} from "./employe-dashboard/employe-dashboard.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {ServiceDashboardComponent} from "./service-dashboard/service-dashboard.component";
import {LocationDashboardComponent} from "./location-dashboard/location-dashboard.component";
import {BeneficierDashboardComponent} from "./beneficier-dashboard/beneficier-dashboard.component";
import {ActiviteDashboardComponent} from "./activite-dashboard/activite-dashboard.component";

const routes: Routes = [

  {path : '' , component : WelcomeComponent,pathMatch : 'full'},
  {path : 'employee' , component : EmployeDashboardComponent },
  {path : 'service' , component : ServiceDashboardComponent },
  {path : 'location' , component : LocationDashboardComponent },
  {path : 'beneficiary' , component : BeneficierDashboardComponent },
  {path : 'activity' , component : ActiviteDashboardComponent },
  {path : '**' , redirectTo:'' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
