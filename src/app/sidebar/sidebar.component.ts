import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataSharingService } from '../services/data-sharing.service';

import { Company1Component } from '../company1/company1.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule,Company1Component],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit , OnChanges {
  @Input() companyContext: string = 'company1';
  currentData: string;
  // companyContext: string="";

  constructor(private dataSharingService: DataSharingService) {
    this.currentData = 'company1';
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['companyContext']) {
      console.log('Company context changed:', changes['companyContext'].currentValue);
      this.companyContext = changes['companyContext'].currentValue;
    }
  }

  ngOnInit(): void {
    this.dataSharingService.currentData.subscribe(data => {
      this.currentData = data;
      this.companyContext = data.toLowerCase().replace(' ', ''); // Assuming data format "Company 1"
    });


  }
  }

