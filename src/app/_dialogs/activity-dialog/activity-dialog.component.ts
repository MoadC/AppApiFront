import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import { ActivityService } from "../../_services/activity.service";
import Swal from 'sweetalert2/dist/sweetalert2.all.js';


@Component({
  selector: 'app-activity-dialog',
  templateUrl: './activity-dialog.component.html',
  styleUrls: ['./activity-dialog.component.css']
})
export class ActivityDialogComponent implements OnInit {

  editMode: boolean = false;
  AddActivityForm: FormGroup;
  Activity_Name ='';
  Activity_Date ='';
  Activity_Type ='';
  Activity_Place ='';
  chefEquipeId = 18;

  constructor(private activityService: ActivityService, @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
    this.initForm();
  }


  onSubmit() {
    if (this.editMode) {
      this.activityService.UpdateActivity(this.data.element.id, this.AddActivityForm.value).subscribe();
      this.editMode = false;
      this.ngOnInit();

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Activity Modified',
        text: 'The Activity has been modified in the list',
        showConfirmButton: false,
        timer: 1800
      })
    } else {
      this.activityService.PostActivity(this.AddActivityForm.value).subscribe();
      this.ngOnInit();

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'New Activity Added',
        text: 'The new Activity has been added to the list',
        showConfirmButton: false,
        timer: 1800
      })
    }
  }

  initForm(){
    if (this.data) {

      this.editMode = true;
      this.Activity_Name = this.data.element.activityName;
      this.Activity_Date = this.data.element.activityDate;
      this.Activity_Type = this.data.element.activityType;
      this.Activity_Place = this.data.element.activityPlace;
      this.chefEquipeId = this.data.element.chefEquipeId;

    }

    this.AddActivityForm = new FormGroup({
      'activityName': new FormControl(this.Activity_Name, Validators.required),
      'activityDate': new FormControl(this.Activity_Date, Validators.required),
      'activityType': new FormControl(this.Activity_Type, Validators.required),
      'activityPlace': new FormControl(this.Activity_Place, Validators.required),
      'chefEquipeId': new FormControl(this.chefEquipeId, Validators.required),
    });
  }
}
