import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementStatusDialogComponent } from './agreement-status-dialog.component';

describe('AgreementStatusDialogComponent', () => {
  let component: AgreementStatusDialogComponent;
  let fixture: ComponentFixture<AgreementStatusDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgreementStatusDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgreementStatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
