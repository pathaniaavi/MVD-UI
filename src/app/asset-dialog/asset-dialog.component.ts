import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AssetService } from '../services/asset.service';
import { ActivatedRoute } from '@angular/router';
interface  Data {
  companyContext :string
}
@Component({
  selector: 'app-asset-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './asset-dialog.component.html',
  styleUrls: ['./asset-dialog.component.scss']
})
export class AssetDialogComponent implements  OnInit{
  form: FormGroup;
  assets: any[] = [];
  totalAssets: number = 0;
  companyContext: any;

  constructor(public dialogRef: MatDialogRef<AssetDialogComponent>,private assetService: AssetService,private route: ActivatedRoute ,@Inject(MAT_DIALOG_DATA) public data: Data ) {
    this.form = new FormGroup({
      id: new FormControl('', [Validators.required]),
      contentType: new FormControl('application/json', [Validators.required]),
      name: new FormControl('product description', [Validators.required]),
      baseUrl: new FormControl('https://jsonplaceholder.typicode.com/users', [Validators.required, Validators.pattern('https?://.+')]),
    });
  }
  ngOnInit(): void {
    this.setCompany()
  }

  setCompany(){
    this.route.parent?.url.subscribe(url => {
      const path = url[0].path;
      this.companyContext = path;
      console.log("Asset:",this.companyContext); // Log to verify
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  onSubmit(): void {
    if (this.form.valid) {
      this.assetService.submitAsset(this.form.value,this.data.companyContext).subscribe(
        response => {
          console.log('Asset submitted successfully', response);
          this.dialogRef.close(true);
        },
        error => {
          console.error('Error submitting asset', error);
        }
      );
    }
  }

}
