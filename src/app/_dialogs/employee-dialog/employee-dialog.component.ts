import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../../_services/employee.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Service} from '../../_interfaces/service';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';


@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent implements OnInit {

  editMode : boolean = false;
  AddEmployeeForm: FormGroup;
  @ViewChild('pass') pass;
  First_Name ='';
  Last_Name ='';
  Gender ='';
  Phone_Number ='';
  EmployeeType ='';
  Type_Equipe ='';
  Email ='';
  UserName ='';
  Password = '';
  smth : boolean = false;

  types = ['Assistant', 'ChefEquipe'];
  genders = ['Male', 'Female'];
  Services: Service[]= [];


  constructor(private employeeService : EmployeeService,
              public dialogRef: MatDialogRef<EmployeeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
    this.initForm();
    this.employeeService.getServices().subscribe(data => {
      this.Services = data;
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.employeeService.UpdateEmployee(this.data.element.id, this.AddEmployeeForm.value)
        .subscribe(employees =>{
          console.log("employees", employees);
          this.editMode=false;
          this.dialogRef.close(employees);
        });
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Record Modified',
        text: 'The Employee has been modified in the list',
        showConfirmButton: false,
        timer: 1800
      })
    }else {
      this.employeeService.PostEmployee(this.AddEmployeeForm.value)
        .subscribe(employees =>{
          console.log("employees", employees);
          this.editMode=false;
          this.dialogRef.close(employees);
          this.smth=false;
        },
        error => {
          console.log(error);
          this.smth =true;
        });
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
      'email': new FormControl(this.Email, [Validators.required,Validators.email]),
      'userName': new FormControl(this.UserName, [Validators.required]),
      'password': new FormControl(this.Password , Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&]).{6,12}$'))
    });
  }

  CancelDialog() {
    this.employeeService.getEmployees().subscribe(data=>{
      this.dialogRef.close(data);
    });
  }

  showPassword() {
    if(this.pass.nativeElement.type === 'password'){
      this.pass.nativeElement.type = 'text';
    } else{
      this.pass.nativeElement.type = 'password';
    }
  }
}
