import { Component, OnInit } from '@angular/core';

import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../../_services/employee.service";
import {Employee} from "../../_interfaces/employee";

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent implements OnInit {

  AddEmployeeForm: FormGroup;
  Employee : Employee;

  constructor(private employeeService : EmployeeService) { }


  ngOnInit(): void {
    this.initForm();
  }


  onSubmit() {
    console.log(this.AddEmployeeForm.value);
     this.employeeService.PostEmployee(this.AddEmployeeForm.value);
  }

  initForm(){
    let First_Name ='';
    let Last_Name ='';
    let Gender ='';
    let Phone_Number ='';
    let EmployeeType ='';
    let Type_Equipe ='';
    let Email ='';
    let UserName ='';
    let Password ='';

    this.AddEmployeeForm = new FormGroup({
      'firstName': new FormControl(First_Name, Validators.required),
      'lastName': new FormControl(Last_Name, Validators.required),
      'gender': new FormControl(Gender, Validators.required),
      'phoneNumber': new FormControl(Phone_Number, Validators.required),
      'employerType': new FormControl(EmployeeType, Validators.required),
      'typeEquipe': new FormControl(Type_Equipe, Validators.required),
      'email': new FormControl(Email, Validators.required),
      'userName': new FormControl(UserName, Validators.required),
      'password': new FormControl(Password, Validators.required),
    });
  }
}
