import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {EmployeeService} from "../_services/employee.service";
import {EmployeeDialogComponent} from "../_dialogs/employee-dialog/employee-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Employee} from "../_interfaces/employee";


@Component({
  selector: 'app-employe-dashboard',
  templateUrl: './employe-dashboard.component.html',
  styleUrls: ['./employe-dashboard.component.css']
})
export class EmployeDashboardComponent implements OnInit {

  constructor(private employeService : EmployeeService,public dialog: MatDialog) { }

  dataSource  : any;
  displayedColumns: string[] = ['firstName','lastName','email','phoneNumber','employerType','typeEquipe','Edit','Delete'];
  @ViewChild(MatPaginator) paginator?: MatPaginator ;

  ngOnInit(): void {
   // this.dataSource.paginator = this.paginator;
    this.getEmployees();
  }

  getEmployees(){
    this.employeService.getEmployees();
    this.employeService.employees.subscribe(data=>{
      this.dataSource =  new MatTableDataSource<Employee>(data);
    });
  }

  openDialog() {
    this.dialog.open(EmployeeDialogComponent,{
      width : '60vw',
      height : '70vh'
    });
  }
}


