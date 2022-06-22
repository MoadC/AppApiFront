import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarVeriosn2Component } from './nav-bar-veriosn2.component';

describe('NavBarVeriosn2Component', () => {
  let component: NavBarVeriosn2Component;
  let fixture: ComponentFixture<NavBarVeriosn2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarVeriosn2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarVeriosn2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
