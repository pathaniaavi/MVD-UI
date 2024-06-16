import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { NegotiateService } from '../services/negotiate.service';
import { CommonModule } from '@angular/common'; // Add this import

interface Data {
  agreementId:string;
  company:string;

}

@Component({
  selector: 'app-agreement-status-dialog',
  standalone: true,
  imports: [MatDialogModule,CommonModule],
  templateUrl: './agreement-status-dialog.component.html',
  styleUrl: './agreement-status-dialog.component.scss'
})
export class AgreementStatusDialogComponent {

  negotiation :any ={};

  constructor(public dialogRef: MatDialogRef<AgreementStatusDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: Data, private negotiateService :NegotiateService  ){
    this.getAgreementData();
  }

  getAgreementData(){
    console.log("getAgreementData");
    this.negotiateService.fetchContractNegotitations(this.data.company, this.data.agreementId).subscribe({
      next: (res) => {
        console.log(res);
        this.negotiation ={
          contractid :  res["@id"],
          contractAgreementId : res["edc:contractAgreementId"],
          type: res["edc:type"],
          state: res["edc:state"],
        }
      },
      error: (err) => {
        console.log(err);
      }
    })

  }
  }


