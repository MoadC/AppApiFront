import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AuthGuardService} from "../auth-guard-service";
import {AuthService} from "../_auth/auth.service";


@Component({
  selector: 'app-nav-bar-veriosn2',
  templateUrl: './nav-bar-veriosn2.component.html',
  styleUrls: ['./nav-bar-veriosn2.component.css']
})
export class NavBarVersion2Component implements OnInit {

  constructor(private dialog : MatDialog , private authService : AuthGuardService ,
              private authServiceLogin : AuthService
              ) { }

  ngOnInit(): void {
  }

  login(){
    //this.authServiceLogin.login();
  }

}
