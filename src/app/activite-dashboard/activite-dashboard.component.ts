import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {Activity} from "../_interfaces/activity";
import {ActivityService} from "../_services/activity.service";
import { ActivityDialogComponent } from "../_dialogs/activity-dialog/activity-dialog.component";
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

@Component({
  selector: 'app-activite-dashboard',
  templateUrl: './activite-dashboard.component.html',
  styleUrls: ['./activite-dashboard.component.css']
})
export class ActiviteDashboardComponent implements OnInit,AfterViewInit {

  activities : Activity[] = [];

  constructor(private ActivityService: ActivityService, public dialog: MatDialog) {
  }

  dataSource = new MatTableDataSource<Activity>(this.activities);
  displayedColumns: string[] = ['activityName', 'activityDate', 'activityType', 'activityPlace','employerId', 'Edit', 'Delete'];
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild('input') input ;
  result = 'No data matching the filter';

  ngOnInit(): void {
    this.ActivityService.getActivites().subscribe(activities => {
      this.dataSource.data = activities;
      if((this.dataSource.data.length === 0)) {
        this.input.nativeElement.disabled = true;
        this.result = "No data found !";
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ActivityDialogComponent, {
      disableClose: true,
      width: '600px',
      height: '400px',
    });
    dialogRef.afterClosed().subscribe(data => {
      this.dataSource.data = data;
    });
  }
  removeActivity(id: number) {
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
        this.ActivityService.DeleteActivity(id).subscribe(data => {
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
    const dialogRef = this.dialog.open(ActivityDialogComponent, {
      disableClose: true,
      width: '600px',
      height: '400px',
      data: {
        element: element
      }
    });
    dialogRef.afterClosed().subscribe(data => {
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
