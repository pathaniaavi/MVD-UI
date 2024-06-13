import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogBrowserComponent } from './catalog-browser.component';

describe('CatalogBrowserComponent', () => {
  let component: CatalogBrowserComponent;
  let fixture: ComponentFixture<CatalogBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogBrowserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
