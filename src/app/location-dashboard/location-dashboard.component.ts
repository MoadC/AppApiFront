import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LocationDialogComponent } from '../_dialogs/location-dialog/location-dialog.component';
import { LocationService } from '../_services/location.service';

@Component({
  selector: 'app-location-dashboard',
  templateUrl: './location-dashboard.component.html',
  styleUrls: ['./location-dashboard.component.css']
})
export class LocationDashboardComponent implements OnInit {

  locations: Location[] = [];
  constructor(private locationService: LocationService, public dialog: MatDialog) { }

  dataSource = new MatTableDataSource<Location>(this.locations);
  displayedColumns: string[] = ['locationName', 'locationCity', 'Edit', 'Delete'];
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  ngOnInit(): void {
    this.locationService.getLocations().subscribe(locations => {
      this.dataSource.data = locations;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(LocationDialogComponent, {
      width: '50vw',
      height: '50vh'
    });
    dialogRef.afterClosed().subscribe(data => {
      this.ngOnInit();
    });
  }

  removeLocation(id: number) {
    console.log(id);
    this.locationService.DeleteLocation(id).subscribe(data => {
      this.ngOnInit();
    });
  }

  OpenDialogToUpdate(element) {
    console.log(element);
    const dialogRef = this.dialog.open(LocationDialogComponent, {
      width: '50vw',
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
