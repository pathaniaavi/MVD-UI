import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { PolicyService } from '../services/policy.service';
import { AssetService } from '../services/asset.service';
import { ContractService } from '../services/contract.service';
import { ActivatedRoute } from '@angular/router';

interface Data {
  companyContext: string;
}

@Component({
  selector: 'app-contract-definition-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './contract-definition-dialog.component.html',
  styleUrl: './contract-definition-dialog.component.scss',
})
export class ContractDefinitionDialogComponent implements OnInit {
  policies: any[] = [];
  form: FormGroup;
  assetPolicies = ['Policy1', 'Policy2', 'Policy3'];
  contractPolicies = ['PolicyA', 'PolicyB', 'PolicyC'];
  assets: any[] = [];
  companyContext: string = '';

  constructor(
    public dialogRef: MatDialogRef<ContractDefinitionDialogComponent>,
    private route: ActivatedRoute,
    private policyService: PolicyService,
    private assetService: AssetService,
    private contractService: ContractService,
    @Inject(MAT_DIALOG_DATA) public data: Data
  ) {
    this.setCompany();
    this.form = new FormGroup({
      id: new FormControl('', [Validators.required]),
      accessPolicy: new FormControl('', [Validators.required]),
      contractPolicy: new FormControl('', [Validators.required]),
      assetId: new FormControl('', [Validators.required]),
    });
  }

  setCompany() {
    this.route.parent?.url.subscribe((url) => {
      const path = url[0].path;
      this.companyContext = path;
      console.log('Asset1:', this.companyContext); // Log to verify
    });
  }
  ngOnInit(): void {
    this.setCompany();
    this.policyService.fetchPolicies(this.data.companyContext).subscribe({
      next: (response: any[]) => {
        this.policies = response.map((policy) => ({
          id: policy['@id'],
        }));
      },
      error: (error) => {},
    });
    this.assetService.fetchAssets(this.data.companyContext).subscribe({
      next: (response: any[]) => {
        this.assets = response.map((asset) => ({
          id: asset['@id'],
        }));
        console.log('Fetched assets:', this.assets);
      },
      error: (error) => {
        console.error('Error fetching assets', error);
      },
    });
    console.log(this.policies);
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.contractService
        .submitContract(this.form.value, this.data.companyContext)
        .subscribe({
          next: (response) => {
            console.log('Contract submitted successfully', response);
            this.dialogRef.close(true);
          },
          error: (error) => {
            console.error('Error submitting contract', error);
            this.dialogRef.close(false);
          },
        });


    }
    else{
      // this.dialogRef.close(false);
    }
  }
}
