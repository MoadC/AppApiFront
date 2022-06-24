import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../../_services/employee.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(private EmployeeService : EmployeeService) { }

  ngOnInit(): void {

  }

  EmployeeObject = {
    FirstName : 'testtttttttttttttttt',
    lastName : 'em1',
    PhoneNumber : 'em1',
    Email : 'em1',
    Password : 'em1',
    EmployeeType : 'em1',
    EquipeType : 'em1',
    Gender : 'em1',
    Username : 'em1',
  }


  addEmploye() {
    this.EmployeeService.PostEmployee(this.EmployeeObject);
  }
  ShowEmploye() {
    this.EmployeeService.getOneEmployees(11);
  }

}
