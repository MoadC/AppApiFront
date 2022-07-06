import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LocationDialogComponent } from '../_dialogs/location-dialog/location-dialog.component';
import { LocationService } from '../_services/location.service';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

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

  //removeLocation(id: number) {
  //  console.log(id);
  //  this.locationService.DeleteLocation(id).subscribe(data => {
  //    this.ngOnInit();
  //  });
  //}
  removeLocation(id: number) {
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
        this.locationService.DeleteLocation(id).subscribe(data => {
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
