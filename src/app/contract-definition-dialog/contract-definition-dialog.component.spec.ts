import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractDefinitionDialogComponent } from './contract-definition-dialog.component';

describe('ContractDefinitionDialogComponent', () => {
  let component: ContractDefinitionDialogComponent;
  let fixture: ComponentFixture<ContractDefinitionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractDefinitionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractDefinitionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
