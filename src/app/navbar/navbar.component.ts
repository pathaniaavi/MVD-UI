import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DataSharingService } from '../services/data-sharing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule,RouterModule,SidebarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  showFiller = false;
  sidebarVisible = false;
  companyContext: string = 'company1';

  constructor(private router: Router,private dataSharingService: DataSharingService) {}

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
    this.dataSharingService.changeData(this.companyContext);
    console.log(this.companyContext); // Ensure the value is updated
    this.router.navigate([`/${this.companyContext}`]);
  }

}
