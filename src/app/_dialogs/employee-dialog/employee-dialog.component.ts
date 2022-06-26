import {Component, Inject, OnInit} from '@angular/core';

import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../../_services/employee.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";


@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent implements OnInit {

   editMode : boolean = false;
   AddEmployeeForm: FormGroup;
   First_Name ='';
   Last_Name ='';
   Gender ='';
   Phone_Number ='';
   EmployeeType ='';
   Type_Equipe ='';
   Email ='';
   UserName ='';
   Password ='';

  constructor(private employeeService : EmployeeService,  @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
    this.initForm();
    console.log(this.AddEmployeeForm.value.password);
  }


  onSubmit() {
    if (this.editMode) {
       this.employeeService.UpdateEmployee(this.data.element.id, this.AddEmployeeForm.value).subscribe();
       this.editMode=false;
       this.ngOnInit();
    }else {
      this.employeeService.PostEmployee(this.AddEmployeeForm.value).subscribe();
      this.ngOnInit();
    }
  }

  initForm(){
    if (this.data) {

      this.editMode = true;
      this.First_Name =  this.data.element.firstName;
      this.Last_Name = this.data.element.lastName;
      this.Gender = this.data.element.gender;
      this.Phone_Number = this.data.element.phoneNumber;
      this.EmployeeType = this.data.element.employerType;
      this.Type_Equipe = this.data.element.typeEquipe;
      this.Email = this.data.element.email;
      this.UserName = this.data.element.userName;
      this.Password = this.data.element.password;

      }
    this.AddEmployeeForm = new FormGroup({
      'firstName': new FormControl(this.First_Name, Validators.required),
      'lastName': new FormControl(this.Last_Name, Validators.required),
      'gender': new FormControl(this.Gender, Validators.required),
      'phoneNumber': new FormControl(this.Phone_Number, Validators.required),
      'employerType': new FormControl(this.EmployeeType, Validators.required),
      'typeEquipe': new FormControl(this.Type_Equipe, Validators.required),
      'email': new FormControl(this.Email, Validators.required),
      'userName': new FormControl(this.UserName, Validators.required),
      'password': new FormControl(this.Password)
    });
  }
}
