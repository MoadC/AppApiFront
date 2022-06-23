import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarVeriosn2Component } from './side-bar-veriosn2.component';

describe('SideBarVeriosn2Component', () => {
  let component: SideBarVeriosn2Component;
  let fixture: ComponentFixture<SideBarVeriosn2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideBarVeriosn2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarVeriosn2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
