import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaireDialogComponent } from './beneficiaire-dialog.component';

describe('BeneficiaireDialogComponent', () => {
  let component: BeneficiaireDialogComponent;
  let fixture: ComponentFixture<BeneficiaireDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficiaireDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiaireDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
