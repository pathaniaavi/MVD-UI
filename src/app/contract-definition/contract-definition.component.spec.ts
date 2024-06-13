import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractDefinitionComponent } from './contract-definition.component';

describe('ContractDefinitionComponent', () => {
  let component: ContractDefinitionComponent;
  let fixture: ComponentFixture<ContractDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractDefinitionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
