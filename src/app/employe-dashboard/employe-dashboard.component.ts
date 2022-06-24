import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {EmployeeService} from "../_services/employee.service";


@Component({
  selector: 'app-employe-dashboard',
  templateUrl: './employe-dashboard.component.html',
  styleUrls: ['./employe-dashboard.component.css']
})
export class EmployeDashboardComponent implements OnInit {

  constructor(private employeService : EmployeeService) { }

  Employees : EmployeeInterface[] = [] ;
  dataSource  : any;

  ngOnInit(): void {
    this.employeService.getEmployees();
    this.employeService.employees.subscribe(data=>{
     this.dataSource =  new MatTableDataSource<EmployeeInterface>(data);
    })
    //this.dataSource.paginator = this.paginator;
  }
  displayedColumns: string[] = ['firstName','email'];

  @ViewChild(MatPaginator) paginator?: MatPaginator ;

}

export interface EmployeeInterface {
  firstName : '',
  lastName : '',
  phoneNumber : '',
  email : '',
  employeeType : '',
  equipeType : '',
  gender : '',
  username : '',
}


