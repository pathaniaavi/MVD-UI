import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../services/catalog.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog-browser',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog-browser.component.html',
  styleUrl: './catalog-browser.component.scss'
})
export class CatalogBrowserComponent implements OnInit {
  companyContext: string='';
  catalog: any[] =[];
  totalCatalog :number =0;

  constructor (private catalogService :CatalogService , private route: ActivatedRoute){}



    setCompany(){
      this.route.parent?.url.subscribe(url => {
        const path = url[0].path;
        this.companyContext = path;
        console.log("Asset:",this.companyContext); // Log to verify
      });
    }

  ngOnInit(): void {
    this.setCompany()
    this.fetchCatalog();
  }
  fetchCatalog() {
    this.catalogService.fetchCatalogs(this.companyContext).subscribe({
      next: (response: any) => {
        console.log('Raw response:', response);
        const dataset = response['dcat:dataset'];

        if (dataset) {
          if (Array.isArray(dataset)) {
            this.catalog = dataset.map((item: any) => ({
              datasetId: item['@id'],
              name: item['edc:name']
            }));
          } else {
            this.catalog = [{
              datasetId: dataset['@id'],
              name: dataset['edc:name']
            }];
          }

          this.totalCatalog = this.catalog.length;
          console.log('Mapped catalog data:', JSON.stringify(this.catalog, null, 2));
        } else {
          console.error('Unexpected response structure or type:', response);
        }
      },
      error: (error) => {
        console.error('Error fetching catalog:', error);
      }
    });
  }


}
