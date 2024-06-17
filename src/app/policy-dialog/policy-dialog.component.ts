import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { filter } from 'rxjs';

interface Data{
  company :string
}
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
export class PolicyDialogComponent implements OnInit {
  form: FormGroup;
  policies: Policy[] = [];
  companyContext: string = '';

  constructor(
    public dialogRef: MatDialogRef<PolicyDialogComponent>,
    private policyService: PolicyService,
    private route: ActivatedRoute, private cookieService: CookieService, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {



    console.log("COmpany Data : ", this.companyContext)
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

    const companyCookie = this.cookieService.get('company');
    console.log('Company cookie value:', companyCookie);
  }
  ngOnInit(): void {
    this.setCompany(this.router.url);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        const navEndEvent = event as NavigationEnd;
        this.setCompany(navEndEvent.urlAfterRedirects);
        this.cookieService.set('companyContext', this.companyContext);
        console.log('Updated company context on navigation:', this.companyContext);
      });
  }
  setCompany(url: string): void {
    if (url.includes('/company2')) {
      this.companyContext = 'company2';
    } else {
      this.companyContext = 'company1';
    }
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
          'permission': policy.permissions ||[],
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
