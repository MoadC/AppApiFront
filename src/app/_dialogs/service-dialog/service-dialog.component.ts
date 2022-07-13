import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AppSerService } from '../../_services/app-ser.service';

@Component({
  selector: 'app-service-dialog',
  templateUrl: './service-dialog.component.html',
  styleUrls: ['./service-dialog.component.css']
})


export class ServiceDialogComponent implements OnInit {

      editMode: boolean = false;
      AddServiceForm: FormGroup;
      Service_Name ='';

      constructor(private appSer: AppSerService,  public dialogRef: MatDialogRef<ServiceDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

      ngOnInit(): void {
      this.initForm();
    }


    onSubmit() {
      if (this.editMode) {
        this.appSer.UpdateService(this.data.element.id, this.AddServiceForm.value).subscribe(services =>{
          console.log("services", services);
          this.editMode=false;
          this.dialogRef.close(services);
        });
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Service Modified',
          text: 'The Service has been modified in the list',
          showConfirmButton: false,
          timer: 1800
        })
      } else {
        this.appSer.PostService(this.AddServiceForm.value).subscribe(services =>{
          console.log("services", services);
          this.editMode=false;
          this.dialogRef.close(services)
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
    initForm(){
      if (this.data) {
        this.editMode = true;
        this.Service_Name = this.data.element.nameService;
      }
      this.AddServiceForm = new FormGroup({
        'nameService': new FormControl(this.Service_Name, Validators.required),
      });
    }
  CancelDialog() {
    this.appSer.getServices().subscribe(data=>{
      this.dialogRef.close(data);
    });
  }
}
