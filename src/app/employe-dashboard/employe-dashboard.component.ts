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

  constructor(private employeeService : EmployeeService,public dialog: MatDialog) { }

  employees : Employee[] = [];
  dataSource =  new MatTableDataSource<Employee>(this.employees);
  displayedColumns: string[] = ['firstName','lastName','email','phoneNumber','employerType','typeEquipe','Edit','Delete'];
  @ViewChild(MatPaginator) paginator?: MatPaginator ;

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.dataSource.data = employees;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(EmployeeDialogComponent,{
      width : '60vw',
      height : '70vh'
    });
    dialogRef.afterClosed().subscribe( data => {
        this.ngOnInit();
    });
  }

  removeEmployee(id : number) {
    console.log(id);
    this.employeeService.DeleteEmployee(id).subscribe(data=>{
        this.ngOnInit();
      });
  }

  OpenDialogToUpdate(element) {
    console.log(element);
    const dialogRef = this.dialog.open(EmployeeDialogComponent,{
      width : '60vw',
      height : '70vh',
      data : {
        element : element
      }
    });
    dialogRef.afterClosed().subscribe( data => {
      this.ngOnInit();
    });

  }
}


