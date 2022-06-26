import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceDialogComponent } from '../_dialogs/service-dialog/service-dialog.component';
import { Service } from '../_interfaces/service';
import { AppSerService } from '../_services/app-ser.service';

@Component({
  selector: 'app-service-dashboard',
  templateUrl: './service-dashboard.component.html',
  styleUrls: ['./service-dashboard.component.css']
})
export class ServiceDashboardComponent implements OnInit {

  services: Service[] = [];
  constructor(private appSer: AppSerService, public dialog: MatDialog) { }

  dataSource = new MatTableDataSource<Service>(this.services);
  displayedColumns: string[] = ['id', 'nameService','Edit','Delete'];
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  ngOnInit(): void {
    this.appSer.getServices().subscribe(services => {
      this.dataSource.data = services;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ServiceDialogComponent, {
      width: '50vw',
      height: '30vh'
    });
    dialogRef.afterClosed().subscribe(data => {
      this.ngOnInit();
    });
  }

  removeService(id: number) {
    console.log(id);
    this.appSer.DeleteService(id).subscribe(data => {
      this.ngOnInit();
    });
  }

  OpenDialogToUpdate(element) {
    console.log(element);
    const dialogRef = this.dialog.open(ServiceDialogComponent, {
      width: '50vw',
      height: '30vh',
      data: {
        element: element
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      this.ngOnInit();
    });

  }

}
