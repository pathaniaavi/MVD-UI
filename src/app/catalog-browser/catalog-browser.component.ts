import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../services/catalog.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NegotiateService } from '../services/negotiate.service';
import { MatDialog } from '@angular/material/dialog';
import { AgreementStatusDialogComponent } from '../agreement-status-dialog/agreement-status-dialog.component';

@Component({
  selector: 'app-catalog-browser',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog-browser.component.html',
  styleUrl: './catalog-browser.component.scss'
})
export class CatalogBrowserComponent implements OnInit {
  companyContext: string='';
  catalog: any[] =[];
  totalCatalog :number =0;


  constructor (private catalogService :CatalogService , private route: ActivatedRoute, private negotiateService :NegotiateService ,public dialog: MatDialog){}
    setCompany(){
      this.route.parent?.url.subscribe(url => {
        const path = url[0].path;
        this.companyContext = path;
        console.log("Asset:",this.companyContext); // Log to verify
      });
    }

  ngOnInit(): void {
    this.setCompany()
    this.fetchCatalog();
  }
  fetchCatalog() {
    this.catalogService.fetchCatalogs(this.companyContext).subscribe({
      next: (response: any) => {
        console.log('Raw response:', response);
        const dataset = response['dcat:dataset'];

        if (dataset) {
          if (Array.isArray(dataset)) {
            this.catalog = dataset.map((item: any) => ({
              assetId: item['@id'],
              assetName: item['edc:name'],
              policyData: item["odrl:hasPolicy"]
            }));
          } else {
            this.catalog = [{
              assetId: dataset['@id'],
              assetName: dataset['edc:name'],
              policyData: dataset["odrl:hasPolicy"]
            }];
          }

          this.totalCatalog = this.catalog.length;
          console.log('Mapped catalog data:', JSON.stringify(this.catalog, null, 2));
        } else {
          console.error('Unexpected response structure or type:', response);
        }
      },
      error: (error) => {
        console.error('Error fetching catalog:', error);
      }
    });
  }

  negotiateContract ( item : any){

    console.log("Negotiate "+item.policyData["@id"])

    this.negotiateService.submitNegotiation(this.companyContext, item).subscribe(
      {
        next: (response: any) => {
          console.log('Raw response:', response["@id"]);
          this.openAgreementStatus(response["@id"]);
        }
        ,
        error : (error => {
          console.error('Error negotiating contract:', error);
        })
      }
    )
  }
  openAgreementStatus(agreementId:string): void {
    const dialogRef = this.dialog.open(AgreementStatusDialogComponent, {
      width: '500px',disableClose: true,
      data: { agreementId: agreementId ,
        company: this.companyContext   }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }


}
