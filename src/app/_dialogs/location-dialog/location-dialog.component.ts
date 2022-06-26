import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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


  constructor(private locationService: LocationService, @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
    this.initForm();
  }


  onSubmit() {
    if (this.editMode) {
      this.locationService.UpdateLocation(this.data.element.id, this.AddLocationForm.value).subscribe();
      this.editMode = false;
      this.ngOnInit();
    } else {
      this.locationService.PostLocation(this.AddLocationForm.value).subscribe();
      this.ngOnInit();
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
}
