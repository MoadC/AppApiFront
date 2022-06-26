import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BeneficiaireDialogComponent } from '../_dialogs/beneficiaire-dialog/beneficiaire-dialog.component';
import { Beneficiaire } from '../_interfaces/beneficiaire';
import { BeneficiaireService } from '../_services/beneficiaire.service';

@Component({
  selector: 'app-beneficier-dashboard',
  templateUrl: './beneficier-dashboard.component.html',
  styleUrls: ['./beneficier-dashboard.component.css']
})
export class BeneficierDashboardComponent implements OnInit {

  constructor(private beneficiaryService : BeneficiaireService,public dialog: MatDialog) { }

  beneficiaries : Beneficiaire[] = [];
  dataSource =  new MatTableDataSource<Beneficiaire>(this.beneficiaries);
  displayedColumns: string[] = ['firstName','lastName','email','phoneNumber','nationality','vulnerability','birthDate','Edit','Delete'];
  @ViewChild(MatPaginator) paginator?: MatPaginator ;

  ngOnInit(): void {
    this.beneficiaryService.getBeneficiaries().subscribe(beneficiaries => {
      this.dataSource.data = beneficiaries;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(BeneficiaireDialogComponent,{
      width : '60vw',
      height : '70vh'
    });
    dialogRef.afterClosed().subscribe( data => {
        this.ngOnInit();
    });
  }

  removeBeneficiary(id : number) {
    console.log(id);
    this.beneficiaryService.DeleteBeneficiary(id).subscribe(data=>{
        this.ngOnInit();
      });
  }

  OpenDialogToUpdate(element) {
    console.log(element);
    const dialogRef = this.dialog.open(BeneficiaireDialogComponent,{
      width : '60vw',
      height : '70vh',
      data : {
        element : element
      }
    });
    dialogRef.afterClosed().subscribe( data => {
      this.ngOnInit();
    });

  }

}
