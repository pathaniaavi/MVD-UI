import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PolicyDialogComponent } from '../policy-dialog/policy-dialog.component';
import { Policy } from '../Model/policy.model';
import { PolicyService } from '../services/policy.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-policy',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,CommonModule],
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit{
totalAssets: number= 0;
  policies: any[]=[];
  totalPolicies: number=0;
  ;

  constructor(public dialog: MatDialog , private policyService: PolicyService ) {}

  ngOnInit(): void {
    this.fetchPolicies();
  }

  openDialog(): void {
    const  dialogRef = this.dialog.open(PolicyDialogComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchPolicies();
      }
      else{
      console.error("The ID was not added due to an error or user cancellation.");
    }
    });


  }

  fetchPolicies(): void {
    this.policyService.fetchPolicies().subscribe({
      next: (response: any[]) => {
        this.policies = response.map(policy => ({
          id: policy['@id'],
        }));
        this.totalPolicies = this.policies.length;
        console.log('Fetched policies:', this.policies);
      },
      error: (error) => {
        console.error('Error fetching policies', error);
      }
    });
  }
  

  deletePolicy(policyId: string): void {
    this.policyService.deletePolicy(policyId).subscribe({
      next: (response) => {
        console.log('Deleted policy:', response);
        this.fetchPolicies();  // Refresh the list after deletion
      },
      error: (error) => {
        console.error('Error submitting policy:', error);
      }
    });
  }
} 
