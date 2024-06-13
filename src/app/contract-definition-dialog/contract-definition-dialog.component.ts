import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { PolicyService } from '../services/policy.service';
import { response } from 'express';
import { error } from 'console';
import { Policy } from '../Model/policy.model';
import { AssetService } from '../services/asset.service';
import { ContractDefinitionService } from '../services/contract-definition.service';

@Component({
  selector: 'app-contract-definition-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './contract-definition-dialog.component.html',
  styleUrl: './contract-definition-dialog.component.scss'
})
export class ContractDefinitionDialogComponent implements OnInit{
  policies: any[]=[];

  

  form: FormGroup;
  assetPolicies = ['Policy1', 'Policy2', 'Policy3'];
  contractPolicies = ['PolicyA', 'PolicyB', 'PolicyC'];
  assets: any[]= [];

  constructor(public dialogRef: MatDialogRef<ContractDefinitionDialogComponent> , private policyService: PolicyService,private assetService: AssetService , private contractService : ContractDefinitionService) {
    this.form = new FormGroup({
      id: new FormControl('', [Validators.required]),
      accessPolicy: new FormControl('', [Validators.required]),
      contractPolicy: new FormControl('', [Validators.required]),
      assetId: new FormControl('', [Validators.required])
    });
  }
  ngOnInit(): void {

    this.policyService.fetchPolicies().subscribe( {
      next :( response: any[] ) => {
        this.policies = response.map(policy => ({
          id: policy['@id'],
        }));
      },error : (error) =>{

      }
    });
    this.assetService.fetchAssets().subscribe({
      next: (response: any[]) => {
        this.assets = response.map(asset => ({
          id: asset['@id']
        }));
        console.log('Fetched assets:', this.assets);
      },
      error: error => {
        console.error('Error fetching assets', error);
      }
    });
    console.log(this.policies)
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.contractService.submitContract(this.form.value).subscribe({
        next: (response) => {
          console.log('Contract submitted successfully', response);
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Error submitting contract', error);
        }
      });
      this.dialogRef.close(false);
    }
  }
}
