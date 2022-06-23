import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { EmployeDashboardComponent } from './employe-dashboard/employe-dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavBarVersion2Component } from './nav-bar-version2/nav-bar-veriosn2.component';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {SideBarVersion2Component} from './side-bar-version2/side-bar-veriosn2.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {FormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { DialogComponent } from './dialog/dialog.component';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { ServiceDashboardComponent } from './service-dashboard/service-dashboard.component';
import { LocationDashboardComponent } from './location-dashboard/location-dashboard.component';
import { BeneficierDashboardComponent } from './beneficier-dashboard/beneficier-dashboard.component';
import { ActiviteDashboardComponent } from './activite-dashboard/activite-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    NavBarComponent,
    EmployeDashboardComponent,
    WelcomeComponent,
    NavBarVersion2Component,
    SideBarVersion2Component,
    DialogComponent,
    ServiceDashboardComponent,
    LocationDashboardComponent,
    BeneficierDashboardComponent,
    ActiviteDashboardComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    FormsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
