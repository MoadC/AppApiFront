import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AuthGuardService} from "../auth-guard-service";


@Component({
  selector: 'app-nav-bar-veriosn2',
  templateUrl: './nav-bar-veriosn2.component.html',
  styleUrls: ['./nav-bar-veriosn2.component.css']
})
export class NavBarVersion2Component implements OnInit {

  constructor(private dialog : MatDialog , private authService : AuthGuardService
              ) { }
  isAuthenticated : boolean;


  ngOnInit(): void {
    this.authService.isAuthenticateSubject.subscribe(value => {
      console.log(this.authService.isAuthenticate);
      this.isAuthenticated = this.authService.isAuthenticate;
    });

  }


  logout() {
    this.authService.logout();
  }
}
