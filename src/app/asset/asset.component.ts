import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AssetDialogComponent } from '../asset-dialog/asset-dialog.component';
import { AssetService } from '../services/asset.service';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-asset',
  standalone: true,
  imports: [MatCardModule,CommonModule],
  templateUrl: './asset.component.html',
  styleUrl: './asset.component.scss'
})
export class AssetComponent {
  companyContext: string;
  assets: any[] = [];
  totalAssets: number = 0;
    constructor(public dialog: MatDialog, private assetService: AssetService,private route: ActivatedRoute) {
      this.companyContext = '';
    }
    setCompany(){
      this.route.parent?.url.subscribe(url => {
        const path = url[0].path;
        this.companyContext = path;
        console.log("Asset:",this.companyContext); // Log to verify
      });
    }
    ngOnInit(): void {
      this.setCompany()
      this.fetchAssets(this.companyContext);
    }
  openDialog(): void {
    const dialogRef = this.dialog.open(AssetDialogComponent, {
      width: '500px',disableClose: true,
      data: { companyContext: this.companyContext }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchAssets(this.companyContext);
      }
      else{
      console.error("The ID was not added due to an error or user cancellation.");
    }
    });
  }

  fetchAssets(company: string): void {

    this.assetService.fetchAssets(company).subscribe({
      next: (response: any[]) => {
        this.assets = response.map(asset => ({
          id: asset['@id'],
          contentType: asset['edc:properties']['edc:contenttype'],
          type: asset['edc:dataAddress']['@type'],
          baseurl: asset['edc:dataAddress'] ? asset['edc:dataAddress']['edc:baseUrl'] : null,
          name: asset['edc:properties']['edc:name']
        }));
        this.totalAssets = this.assets.length;
        console.log('Fetched assets:', this.assets);
      },
      error: error => {
        console.error('Error fetching assets', error);
      }
    });
  }


  deleteAsset(id: string): void {
    this.assetService.deleteAsset(id,this.companyContext).subscribe({
      next: () => {
        console.log('Asset deleted successfully');
        // this.assets = this.assets.filter(asset => asset.id !== id);
        // this.totalAssets = this.assets.length;
        this.fetchAssets(this.companyContext);
      },
      error: error => {
        console.error('Error deleting asset', error);
      }
    });
  }


  }



