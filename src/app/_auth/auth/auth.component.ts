import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthGuardService} from "../../auth-guard-service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService : AuthGuardService ) { }
  isAuthenticated : boolean;


  authForm : FormGroup
  username : string = '';
  password : string = '';

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    console.log(this.authForm.value);
    this.login();
  }
  initForm(){
    this.authForm = new FormGroup({
     'username' : new FormControl(this.username,Validators.required),
     'password' : new FormControl(this.password,Validators.required)
   })
  }
  login(): void {
    this.authService.getUser().subscribe(user => {
      if(user) {

        console.log(user);

        this.isAuthenticated = true;
        this.authService.login(this.isAuthenticated);
        this.authService.setCurrentUser(user);
      }else {
        this.authService.login(false)
      }
    });
  }
}
