import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ContractDefinitionDialogComponent } from '../contract-definition-dialog/contract-definition-dialog.component';
import { ContractDefinitionService } from '../services/contract-definition.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contract-definition',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contract-definition.component.html',
  styleUrl: './contract-definition.component.scss',
})
export class ContractDefinitionComponent implements OnInit {
  contracts: any[] = [];
  totalContracts: number = 0;
  companyContext: string='';
  constructor(private route: ActivatedRoute,
    public dialog: MatDialog,
    private contractService: ContractDefinitionService
  ) {}

  setCompany(){
    this.route.parent?.url.subscribe(url => {
      const path = url[0].path;
      this.companyContext = path;
      console.log("Asset:",this.companyContext); // Log to verify
    });
  }

  ngOnInit(): void {
    this.setCompany();
    this.fetchContracts();
  }

  fetchContracts(): void {
    this.contractService.fetchContracts(this.companyContext).subscribe({
      next: (response) => {
        this.contracts = response.map((contract) => {
          const assetSelector = contract['edc:assetsSelector'];

          let assetSelectorRight;
          if (Array.isArray(assetSelector)) {
            assetSelectorRight = assetSelector
              .map((selector) => selector['edc:operandRight'])
              .join(', ');
          } else {
            assetSelectorRight = assetSelector['edc:operandRight'];
          }

          return {
            id: contract['@id'],
            accessPolicy: contract['edc:accessPolicyId'],
            contractPolicy: contract['edc:contractPolicyId'],
            assetSelector: assetSelectorRight,
          };
        });

        this.totalContracts = this.contracts.length;
        console.log('Fetched contracts successfully', this.contracts);
      },
      error: (error) => {
        console.error('Error fetching contracts', error);
      },
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ContractDefinitionDialogComponent, {
      width: '500px',
      data:{ companyContext : this.companyContext }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchContracts();
      } else {
        console.error(
          'The ID was not added due to an error or user cancellation.'
        );
      }
    });
  }
  deleteContract(id: string): void {
    this.contractService.deleteContract(id,this.companyContext).subscribe({
      next: (response) => {
        console.log('Deleted policy:', response);
        this.fetchContracts(); // Refresh the list after deletion
      },
      error: (error) => {
        console.error('Error submitting policy:', error);
      },
    });
  }
}
