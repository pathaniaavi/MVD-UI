import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule,RouterModule,SidebarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  showFiller = false;

}
