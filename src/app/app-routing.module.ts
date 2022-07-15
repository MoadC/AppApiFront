import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeDashboardComponent} from "./employe-dashboard/employe-dashboard.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {ServiceDashboardComponent} from "./service-dashboard/service-dashboard.component";
import {LocationDashboardComponent} from "./location-dashboard/location-dashboard.component";
import {BeneficierDashboardComponent} from "./beneficier-dashboard/beneficier-dashboard.component";
import {ActiviteDashboardComponent} from "./activite-dashboard/activite-dashboard.component";
import {AuthComponent} from "./_auth/auth/auth.component";
import {AuthGuard} from "./auth-guard";
import {UnauthorizedComponent} from "./_auth/unauthorized/unauthorized.component";
import {AssistantGuard} from "./_guard/assistant.guard";
import { AdminGuard } from './_guard/admin.guard';
import { ChefEquipeGuard } from './_guard/chef-equipe.guard';

const routes: Routes = [

  {path : '' , component : WelcomeComponent,pathMatch : 'full'},
  {path : 'auth' , component : AuthComponent},
  {path : 'unauthorized' , component : UnauthorizedComponent , canActivate : [AuthGuard] },
  {path : 'employee' , component : EmployeDashboardComponent , canActivate : [AuthGuard, AdminGuard] },
  {path : 'service' , component : ServiceDashboardComponent , canActivate : [AuthGuard, AdminGuard ]},
  {path : 'location' , component : LocationDashboardComponent , canActivate : [AuthGuard, ChefEquipeGuard]},
  {path : 'beneficiary' , component : BeneficierDashboardComponent , canActivate : [AuthGuard ,AssistantGuard]},
  {path : 'activity' , component : ActiviteDashboardComponent , canActivate : [AuthGuard, ChefEquipeGuard ] },
  {path : '**' , redirectTo:'' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
