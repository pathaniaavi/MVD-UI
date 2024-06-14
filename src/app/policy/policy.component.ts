import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PolicyDialogComponent } from '../policy-dialog/policy-dialog.component';
import { Policy } from '../Model/policy.model';
import { PolicyService } from '../services/policy.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

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
  companyContext: string="";
  ;

  constructor(public dialog: MatDialog , private policyService: PolicyService ,private route: ActivatedRoute ) {}

  setCompany(){
    this.route.parent?.url.subscribe(url => {
      const path = url[0].path;
      this.companyContext = path;
      console.log("Asset:",this.companyContext); // Log to verify
    });
  }
  ngOnInit(): void {
    this.setCompany()
    this.fetchPolicies(this.companyContext);
  }

  openDialog(): void {
    const  dialogRef = this.dialog.open(PolicyDialogComponent, {
      width: '500px',
      data :{ companyContext : this.companyContext}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchPolicies(this.companyContext);
      }
      else{
      console.error("The ID was not added due to an error or user cancellation.");
    }
    });


  }

  fetchPolicies(company :string): void {
    this.policyService.fetchPolicies(company).subscribe({
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
    this.policyService.deletePolicy(policyId,this.companyContext).subscribe({
      next: (response) => {
        console.log('Deleted policy:', response);
        this.fetchPolicies(this.companyContext);  // Refresh the list after deletion
      },
      error: (error) => {
        console.error('Error submitting policy:', error);
      }
    });
  }
}
