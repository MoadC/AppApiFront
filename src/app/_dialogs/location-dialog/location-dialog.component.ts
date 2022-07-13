import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { LocationService } from '../../_services/location.service';

@Component({
  selector: 'app-location-dialog',
  templateUrl: './location-dialog.component.html',
  styleUrls: ['./location-dialog.component.css']
})
export class LocationDialogComponent implements OnInit {


  editMode: boolean = false;
  AddLocationForm: FormGroup;
  Location_Name = '';
  LocationCity = '';


  constructor(private locationService: LocationService,  public dialogRef: MatDialogRef<LocationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
    this.initForm();
  }


  onSubmit() {
    if (this.editMode) {
      this.locationService.UpdateLocation(this.data.element.id, this.AddLocationForm.value)
        .subscribe(locations =>{
          console.log("locations", locations);
          this.editMode=false;
          this.dialogRef.close(locations);
        });
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Location Modified',
        text: 'The Location has been modified in the list',
        showConfirmButton: false,
        timer: 1800
      })
    } else {
      this.locationService.PostLocation(this.AddLocationForm.value) .subscribe(locations =>{
        console.log("locations", locations);
        this.editMode=false;
        this.dialogRef.close(locations);
      });
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'New Location Added',
        text: 'The Location has been added to the list',
        showConfirmButton: false,
        timer: 1800
      })
    }
  }

  initForm() {
    if (this.data) {

      this.editMode = true;
      this.Location_Name = this.data.element.locationName;
      this.LocationCity = this.data.element.locationCity;

    }

    this.AddLocationForm = new FormGroup({
      'locationName': new FormControl(this.Location_Name, Validators.required),
      'locationCity': new FormControl(this.LocationCity, Validators.required),
    });
  }
  CancelDialog() {
    this.locationService.getLocations().subscribe(data=>{
      this.dialogRef.close(data);
    });
  }
}
