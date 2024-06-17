import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd ,RouterModule} from '@angular/router';
import { DataSharingService } from '../services/data-sharing.service';
import { Company1Component } from '../company1/company1.component';
import { CookieService } from 'ngx-cookie-service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, Company1Component],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, OnChanges {
  @Input() companyContext: string = '';

  constructor(
    private dataSharingService: DataSharingService,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['companyContext']) {
      // console.log('Company context changed:', changes['companyContext'].currentValue);
      this.companyContext = changes['companyContext'].currentValue;
      this.cookieService.set('companyContext', this.companyContext);
    }
  }

  setCompanyFromUrl(url: string): string {
    if (url.includes('/company2')) {
      return 'company2';
    }
    return 'company1';
  }

  ngOnInit(): void {
    // Handle the initial load
    const initialUrl = this.router.url;
    this.companyContext = this.setCompanyFromUrl(initialUrl);
    this.cookieService.set('companyContext', this.companyContext);

    // Handle route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        const navEndEvent = event as NavigationEnd;
        this.companyContext = this.setCompanyFromUrl(navEndEvent.urlAfterRedirects);
        this.cookieService.set('companyContext', this.companyContext);
      });

    // Update company context based on data sharing service
    this.dataSharingService.currentData.subscribe((data) => {
      this.companyContext = data.toLowerCase().replace(' ', ''); // Assuming data format "Company 1"
      this.cookieService.set('companyContext', this.companyContext);
    });
  }
}
