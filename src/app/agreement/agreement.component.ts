import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContractService } from '../services/contract.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agreement',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agreement.component.html',
  styleUrl: './agreement.component.scss'
})
export class AgreementComponent  implements  OnInit{
agreements: any[]=[];
totalAgreements:number = 0 ;
companyContext:string =""

constructor(private dialog: MatDialog , private contractService:ContractService, private route: ActivatedRoute) {

   }
  ngOnInit(): void {
    this.setCompany()
    console.log(this.companyContext)
    this.contractService.fetchAllContractsAgreements(this.companyContext).subscribe({
      next: (response: any[]) => {
        this.agreements = response.map(agreement => ({
          id: agreement['@id'],
          agreementAssetName: agreement['edc:assetId'],

        }));
        this.totalAgreements = this.agreements.length;
        console.log('Fetched assets:', this.agreements);

      },
      error: (error) => {
        console.log('Error :', error);
      }
    })
  }

   setCompany(){
    this.route.parent?.url.subscribe(url => {
      const path = url[0].path;
      this.companyContext = path;
      console.log("Asset:",this.companyContext);
    });
  }


checkStatus(_t7: any) {
    throw new Error('Method not implemented.');
    }

}
