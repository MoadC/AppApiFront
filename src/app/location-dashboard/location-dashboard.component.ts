import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LocationDialogComponent } from '../_dialogs/location-dialog/location-dialog.component';
import { LocationService } from '../_services/location.service';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import {LocationInterface} from "../_interfaces/locationInterface";

@Component({
  selector: 'app-location-dashboard',
  templateUrl: './location-dashboard.component.html',
  styleUrls: ['./location-dashboard.component.css']
})
export class LocationDashboardComponent implements OnInit,AfterViewInit {

  locations: LocationInterface[] = [];
  constructor(private locationService: LocationService, public dialog: MatDialog) { }

  dataSource = new MatTableDataSource<LocationInterface>(this.locations);
  displayedColumns: string[] = ['locationName', 'locationCity', 'Edit', 'Delete'];
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild('input') input ;
  result = 'No data matching the filter';

  ngOnInit(): void {
    this.locationService.getLocations().subscribe(locations => {
      this.dataSource.data = locations;
      if((this.dataSource.data.length === 0)) {
        this.input.nativeElement.disabled = true;
        this.result = "No data found !";
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(LocationDialogComponent, {
      disableClose: true,
      width: '380px',
      height: '320px',
    });
    dialogRef.afterClosed().subscribe(data => {
      this.dataSource.data=data;
    });
  }
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
      disableClose: true,
      width: '380px',
      height: '320px',
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
