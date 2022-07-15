import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { BeneficiaireService } from 'src/app/_services/beneficiaire.service';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import {formatDate} from "@angular/common";


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
   date : boolean;

  genders = ['Male', 'Female'];
  Locations = [];

  countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];


  constructor(private beneficiaryService : BeneficiaireService,
              public dialogRef: MatDialogRef<BeneficiaireDialogComponent>,  @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
    this.beneficiaryService.getLocations().subscribe(data => {
      this.Locations = data;
    })
    this.initForm();
  }


  onSubmit() {
    if (this.editMode) {
       this.beneficiaryService.UpdateBeneficiary(this.data.element.id, this.AddBeneficiaryForm.value)
         .subscribe(benifs =>{
         console.log("benifs", benifs);
         this.editMode=false;
         this.dialogRef.close(benifs);
       });
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Beneficiary Modified',
        text: 'The Beneficiary has been modified in the list',
        showConfirmButton: false,
        timer: 1800
      })
    }else {
      this.beneficiaryService.PostBeneficiary(this.AddBeneficiaryForm.value)
        .subscribe(benifs =>{
          console.log("benifs", benifs);
          this.editMode=false;
          this.dialogRef.close(benifs);
        });
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'New Beneficiary Added',
        text: 'The new Beneficiary has been added to the list',
        showConfirmButton: false,
        timer: 1800
      })
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
      this.localId = this.data.element.locationId;
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
      'birthDate': new FormControl(this.birthDate, [Validators.required , this.checkBirthDay]),
    });
  }


  CancelDialog() {
   this.beneficiaryService.getBeneficiaries().subscribe(data=>{
     this.dialogRef.close(data);
   });
  }
    checkBirthDay(formControl : FormControl) : {[str : string] : boolean}{
      if(formControl.value > formatDate(Date.now(), 'yyyy-MM-dd', 'en_US')){
        return {name : true};
      }
      return null;
    }
}
