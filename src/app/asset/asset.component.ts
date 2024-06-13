import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AssetDialogComponent } from '../asset-dialog/asset-dialog.component';
import { AssetService } from '../services/asset.service';
// import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { trigger, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-asset',
  standalone: true,
  imports: [MatCardModule,CommonModule],
  templateUrl: './asset.component.html',
  styleUrl: './asset.component.scss'
})
export class AssetComponent {
  assets: any[] = [];
  totalAssets: number = 0;
    constructor(public dialog: MatDialog, private assetService: AssetService) {}

    ngOnInit(): void {
      this.fetchAssets()
    }
  openDialog(): void {
    const dialogRef = this.dialog.open(AssetDialogComponent, {
      width: '500px',disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchAssets();
      }
      else{
      console.error("The ID was not added due to an error or user cancellation.");
    }
    });
  }

  fetchAssets(): void {
    this.assetService.fetchAssets().subscribe({
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
    this.assetService.deleteAsset(id).subscribe({
      next: () => {
        console.log('Asset deleted successfully');
        // this.assets = this.assets.filter(asset => asset.id !== id);
        // this.totalAssets = this.assets.length;
        this.fetchAssets();
      },
      error: error => {
        console.error('Error deleting asset', error);
      }
    });
  }
  
  
  }
  


