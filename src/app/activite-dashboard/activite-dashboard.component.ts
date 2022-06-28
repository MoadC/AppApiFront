import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {Activity} from "../_interfaces/activity";
import {ActivityService} from "../_services/activity.service";
import {ActivityDialogComponent} from "../_dialogs/activity-dialog/activity-dialog.component";

@Component({
  selector: 'app-activite-dashboard',
  templateUrl: './activite-dashboard.component.html',
  styleUrls: ['./activite-dashboard.component.css']
})
export class ActiviteDashboardComponent implements OnInit {

  activities : Activity[] = [];

  constructor(private ActivityService: ActivityService, public dialog: MatDialog) {
  }

  dataSource = new MatTableDataSource<Activity>(this.activities);
  displayedColumns: string[] = ['activityName', 'activityDate', 'activityType', 'activityPlace','chefEquipeId', 'Edit', 'Delete'];
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  ngOnInit(): void {
    this.ActivityService.getActivites().subscribe(activities => {
      this.dataSource.data = activities;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ActivityDialogComponent, {
      width: '70vw',
      height: '50vh'
    });
    dialogRef.afterClosed().subscribe(data => {
      this.ngOnInit();
    });
  }

  removeActivity(id: number) {
    console.log(id);
    this.ActivityService.DeleteActivity(id).subscribe(data => {
      this.ngOnInit();
    });
  }

  OpenDialogToUpdate(element) {
    console.log(element);
    const dialogRef = this.dialog.open(ActivityDialogComponent, {
      width: '70vw',
      height: '50vh',
      data: {
        element: element
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      this.ngOnInit();
    });

  }
}
