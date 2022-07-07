import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService : AuthService) { }
  isAuthenticated : boolean = false;

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
    this.authService.getUser().subscribe(data => {
      if(data) {
        console.log(data);
        console.log(data.role[0]);
        this.isAuthenticated = true;
        this.authService.login(this.isAuthenticated);
      }else {
        this.authService.login(false)
      }
    });
  }
}
