import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Policy } from '../Model/policy.model';
import { PolicyService } from '../services/policy.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-policy-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './policy-dialog.component.html',
  styleUrls: ['./policy-dialog.component.scss'],
})
export class PolicyDialogComponent {
  form: FormGroup;
  policies: Policy[] = [];
  companyContext: string = '';

  constructor(
    public dialogRef: MatDialogRef<PolicyDialogComponent>,
    private policyService: PolicyService,
    private route: ActivatedRoute
  ) {
    this.setCompany();
    const defaultPermission = {
      action: 'use',
      constraint: {
        '@type': 'LogicalConstraint',
        leftOperand: 'https://w3id.org/edc/v0.0.1/ns/regionLocation',
        operator: 'eq',
        rightOperand: 'eu',
      },
    };

    this.form = new FormGroup({
      id: new FormControl('', [Validators.required]),
      permission: new FormControl(JSON.stringify(defaultPermission, null, 2)),
    });
  }
  setCompany() {
    this.route.parent?.url.subscribe((url) => {
      const path = url[0].path;
      this.companyContext = path;
      console.log('Asset:', this.companyContext); // Log to verify
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      const policy = this.form.value;
      let permissions;
      permissions = JSON.parse(this.form.get('permission')?.value);
      console.log(permissions);
      try {
      } catch (error) {
        console.error('Invalid JSON format for permissions:', error);
        return; // Stop submission if permissions JSON is invalid
      }

      const requestBody = {
        '@context': {
          '@vocab': 'https://w3id.org/edc/v0.0.1/ns/',
          'odrl': 'http://www.w3.org/ns/odrl/2/',
        },
        '@id': policy.id,
        'policy': {
          '@context': 'http://www.w3.org/ns/odrl.jsonld',
          '@type': 'set',
          'permission': policy.permissions,
          'prohibition': [],
          'obligation': [],
        },
      };

      this.policyService
        .submitPolicy(requestBody, this.companyContext)
        .subscribe({
          next: (response) => {
            console.log('Policy submitted successfully:', response);
            this.dialogRef.close(true);
            // Refresh the list after submission
          },
          error: (error) => {
            console.error('Error submitting policy:', error);
          },
        });
      this.dialogRef.close(false);
    }
  }
}
