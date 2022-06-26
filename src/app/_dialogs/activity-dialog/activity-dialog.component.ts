import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ActivityService} from "../../_services/activity.service";

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


  constructor(private activityService: ActivityService, @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
    this.initForm();
  }


  onSubmit() {
    if (this.editMode) {
      this.activityService.UpdateActivity(this.data.element.id, this.AddActivityForm.value).subscribe();
      this.editMode = false;
      this.ngOnInit();
    } else {
      this.activityService.PostActivity(this.AddActivityForm.value).subscribe();
      this.ngOnInit();
    }
  }

  initForm(){
    if (this.data) {

      this.editMode = true;
      this.Activity_Name = this.data.element.activityName;
      this.Activity_Date = this.data.element.activityDate;
      this.Activity_Type = this.data.element.activityType;
      this.Activity_Place = this.data.element.activityPlace;

    }

    this.AddActivityForm = new FormGroup({
      'activityName': new FormControl(this.Activity_Name, Validators.required),
      'activityDate': new FormControl(this.Activity_Date, Validators.required),
      'activityType': new FormControl(this.Activity_Type, Validators.required),
      'activityPlace': new FormControl(this.Activity_Place, Validators.required),
    });
  }
}
