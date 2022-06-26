import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BeneficiaireService } from 'src/app/_services/beneficiaire.service';

@Component({
  selector: 'app-beneficiaire-dialog',
  templateUrl: './beneficiaire-dialog.component.html',
  styleUrls: ['./beneficiaire-dialog.component.css']
})
export class BeneficiaireDialogComponent implements OnInit {

  editMode : boolean = false;
   AddBeneficiaryForm: FormGroup;
   First_Name ='';
   Last_Name ='';
   Gender ='';
   Phone_Number ='';
   vulnerability ='';
   nationality ='';
   Email ='';
   localId : number;
   birthDate='';
  

  constructor(private beneficiaryService : BeneficiaireService,  @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {   
    this.initForm();
  }


  onSubmit() {
    if (this.editMode) {      
       this.beneficiaryService.UpdateBeneficiary(this.data.element.id, this.AddBeneficiaryForm.value).subscribe();
       this.editMode=false;
       this.ngOnInit();
    }else {
      this.beneficiaryService.PostBeneficiary(this.AddBeneficiaryForm.value).subscribe();
      this.ngOnInit();
    }
  }

  initForm(){
    if (this.data) {

      this.editMode = true;
      this.First_Name =  this.data.element.firstName;
      this.Last_Name = this.data.element.lastName;
      this.Gender = this.data.element.gender;
      this.Phone_Number = this.data.element.phoneNumber;
      this.vulnerability = this.data.element.vulnerability;
      this.nationality = this.data.element.nationality;
      this.Email = this.data.element.email;
      this.localId = this.data.element.localId;
      this.birthDate=this.data.element.birthDate;
      }

    this.AddBeneficiaryForm = new FormGroup({
      'firstName': new FormControl(this.First_Name, Validators.required),
      'lastName': new FormControl(this.Last_Name, Validators.required),
      'gender': new FormControl(this.Gender, Validators.required),
      'phoneNumber': new FormControl(this.Phone_Number, Validators.required),
      'vulnerability': new FormControl(this.vulnerability, Validators.required),
      'nationality': new FormControl(this.nationality, Validators.required),
      'email': new FormControl(this.Email, Validators.required),
      'localId': new FormControl(this.localId, Validators.required),
      'birthDate': new FormControl(this.birthDate, Validators.required),
    });
  }

}
