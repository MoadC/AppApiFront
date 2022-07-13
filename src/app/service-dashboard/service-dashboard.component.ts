import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceDialogComponent } from '../_dialogs/service-dialog/service-dialog.component';
import { Service } from '../_interfaces/service';
import { AppSerService } from '../_services/app-ser.service';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

@Component({
  selector: 'app-service-dashboard',
  templateUrl: './service-dashboard.component.html',
  styleUrls: ['./service-dashboard.component.css']
})
export class ServiceDashboardComponent implements OnInit,AfterViewInit {

  services: Service[] = [];
  constructor(private appSer: AppSerService, public dialog: MatDialog) { }

  dataSource = new MatTableDataSource<Service>(this.services);
  displayedColumns: string[] = ['id', 'nameService','Edit','Delete'];
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild('input') input ;
  result = 'No data matching the filter';

  ngOnInit(): void {
    this.appSer.getServices().subscribe(services => {
      this.dataSource.data = services;
      if((this.dataSource.data.length === 0)) {
        this.input.nativeElement.disabled = true;
        this.result = "No data found !";
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ServiceDialogComponent, {
      disableClose: true,
      width: '50vw',
      height: '30vh'
    });
    dialogRef.afterClosed().subscribe(data => {
      this.dataSource.data = data;
    });
  }
  removeService(id: number) {
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
        this.appSer.DeleteService(id).subscribe(data => {
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
    const dialogRef = this.dialog.open(ServiceDialogComponent, {
      disableClose: true,
      width: '50vw',
      height: '30vh',
      data: {
        element: element
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      this.dataSource.data = data;
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
