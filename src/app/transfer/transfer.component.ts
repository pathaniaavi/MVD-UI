import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TransferDialogComponent } from '../transfer-dialog/transfer-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TransferService } from '../services/transfer.service';
import { error } from 'console';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.scss'
})
export class TransferComponent implements  OnInit{
  companyContext: string='';
  transferStatus:any;
  transfer :boolean= false;

  constructor(public dialog: MatDialog, private route:ActivatedRoute,private transferService:TransferService ){

  }
  ngOnInit(): void {
    this.setCompany();
  }

  setCompany(){
    this.route.parent?.url.subscribe(url => {
      const path = url[0].path;
      this.companyContext = path;
      console.log("Asset:",this.companyContext); // Log to verify
    });
  }

  openDialog(): void {
console.log("openDialog",this.companyContext)

    const dialogRef = this.dialog.open(TransferDialogComponent, {
      width: '500px',
      data: { companyContext: this.companyContext }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.transfer=true;
        // this.transferStatus= {
        //   id: result["@id"],
        //   // state:result["edc:state"],
        //   // type:result["edc:type"],
        //   // assetId:result["edc:assetId"],
        //   // destination: result["edc:dataDestination"]["edc:baseUrl"]


        // }
        this.updateTransfer(result["@id"]);
      }
      else{
      console.error("The ID was not added due to an error or user cancellation.");
    }
    });
  }
  updateTransfer(id:string) {
    this.transferService.fetchTransferStatus(this.companyContext, id).subscribe({
      next: (result) => {

        console.log("Response: "+ result);
       this.transferStatus= {
          id: result["@id"],
          state:result["edc:state"],
          type:result["edc:type"],
          assetId:result["edc:assetId"],
          destination: result["edc:dataDestination"]["edc:baseUrl"]
        }


      },
      error: (error ) => {
        console.log("Error: "+ error);
      }
    });
  }

}
