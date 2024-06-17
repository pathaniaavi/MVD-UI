import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DataSharingService } from '../services/data-sharing.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { CommonModule,isPlatformBrowser  } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, RouterModule, SidebarComponent,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements  OnInit{
  showFiller = false;
  sidebarVisible = false;
  companyContext: string = '';
  activeCompany: string = '';

  constructor(private router: Router, private dataSharingService: DataSharingService, private route: ActivatedRoute,@Inject(PLATFORM_ID) private platformId: any,
    private cookieService: CookieService) {
    this.setCompany();
    this.cookieService.set('companyContext', this.companyContext);
    this.activeCompany = this.companyContext;
    if (isPlatformBrowser(this.platformId)) {
      this.setCompany();
      this.cookieService.set('companyContext', this.companyContext);
      this.activeCompany = this.companyContext; // Set active company based on initial route
    }
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.companyContext = this.setCompanyFromUrl(window.location.href);
    }


  }

  setCompany() {
    this.route.parent?.url.subscribe((url) => {
      const path = url[0].path;
      this.companyContext = path;
      this.activeCompany = path; // Update active company
      console.log('AssetNave:', this.companyContext); // Log to verify
    });
  }
  setCompanyFromUrl(url: string): string {
    if (url.includes('/company2')) {
      console.log('AssetNave:', this.companyContext);

      return 'company2';
    }
    return 'company1';
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
    const sidebar = document.getElementById('logo-sidebar');
    if (sidebar) {
      if (this.sidebarVisible) {
        sidebar.classList.remove('-translate-x-full');
      } else {
        sidebar.classList.add('-translate-x-full');
      }
    }
  }

  changeCompany(company: string) {
    this.companyContext = company.toLowerCase().replace(' ', '');
    this.activeCompany = this.companyContext; // Update active company
    this.dataSharingService.changeData(this.companyContext);
    console.log(this.companyContext); // Ensure the value is updated
    this.router.navigate([`/${this.companyContext}`]);
    this.cookieService.set('companyContext', this.companyContext);
    console.log('Updated cookie', this.companyContext);
  }
}
