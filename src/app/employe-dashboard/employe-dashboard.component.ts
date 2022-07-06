import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {EmployeeService} from "../_services/employee.service";
import {EmployeeDialogComponent} from "../_dialogs/employee-dialog/employee-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Employee} from "../_interfaces/employee";
import Swal from 'sweetalert2/dist/sweetalert2.all.js';


@Component({
  selector: 'app-employe-dashboard',
  templateUrl: './employe-dashboard.component.html',
  styleUrls: ['./employe-dashboard.component.css'],
})
export class EmployeDashboardComponent implements OnInit , AfterViewInit{

  constructor(private employeeService : EmployeeService,public dialog: MatDialog) { }

  employees : Employee[] = [];
  dataSource =  new MatTableDataSource<Employee>(this.employees);
  displayedColumns: string[] = ['firstName','lastName','email','phoneNumber','employerType','typeEquipe','Edit','Delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

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

  /*removeEmployee(id : number) {
    console.log(id);
    this.employeeService.DeleteEmployee(id).subscribe(data=>{
        this.dataSource.data = data;
      });
  }*/

  removeEmployee(id: number) {
    Swal.fire({
      title: 'Are you sure want to remove this record?',
      text: 'You will not be able to recover it afterwards!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.employeeService.DeleteEmployee(id).subscribe(data => {
          this.dataSource.data = data;
        });
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Record Deleted',
          showConfirmButton: false,
          timer: 1800
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Cancelled Deletion',
          text: 'Your record will remain!',
          showConfirmButton: false,
          timer: 1800
        })
      }
    })
  }

  OpenDialogToUpdate(element) {
    console.log(element);
    const dialogRef = this.dialog.open(EmployeeDialogComponent,{
      width : '60vw',
      height : '70vh',
      data : {
        element : element,
      }
    });
    dialogRef.afterClosed().subscribe( data => {
      this.dataSource.data=data;
    });

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}


