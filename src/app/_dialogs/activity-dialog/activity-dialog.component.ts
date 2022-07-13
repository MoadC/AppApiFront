import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { ActivityService } from "../../_services/activity.service";
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import {AuthGuardService} from "../../auth-guard-service";



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
  employerId  : number;

  constructor(private authService : AuthGuardService,private activityService: ActivityService,
              public dialogRef: MatDialogRef<ActivityDialogComponent> ,@Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user =>{
      this.employerId = this.getDecodedToken(user.token).nameid;
    })
    this.initForm();
  }


  onSubmit() {
    if (this.editMode) {
      this.activityService.UpdateActivity(this.data.element.id, this.AddActivityForm.value).subscribe(activities =>{
        console.log("activities", activities);
        this.editMode=false;
        this.dialogRef.close(activities);
      });
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
      this.activityService.PostActivity(this.AddActivityForm.value).subscribe(activities =>{
        console.log("activities", activities);
        this.editMode=false;
        this.dialogRef.close(activities);
      });

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
      this.employerId = this.data.element.employerId;

    }

    this.AddActivityForm = new FormGroup({
      'activityName': new FormControl(this.Activity_Name, Validators.required),
      'activityDate': new FormControl(this.Activity_Date, Validators.required),
      'activityType': new FormControl(this.Activity_Type, Validators.required),
      'activityPlace': new FormControl(this.Activity_Place, Validators.required),
      'employerId': new FormControl(this.employerId)
    });
  }
  getDecodedToken(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }
  CancelDialog() {
    this.activityService.getActivites().subscribe(data=>{
      this.dialogRef.close(data);
    });
  }
}
