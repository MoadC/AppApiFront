import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficierDashboardComponent } from './beneficier-dashboard.component';

describe('BeneficierDashboardComponent', () => {
  let component: BeneficierDashboardComponent;
  let fixture: ComponentFixture<BeneficierDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficierDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficierDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
