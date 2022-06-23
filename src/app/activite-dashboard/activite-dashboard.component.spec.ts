import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteDashboardComponent } from './activite-dashboard.component';

describe('ActiviteDashboardComponent', () => {
  let component: ActiviteDashboardComponent;
  let fixture: ComponentFixture<ActiviteDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiviteDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
