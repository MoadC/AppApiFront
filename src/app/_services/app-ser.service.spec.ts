import { TestBed } from '@angular/core/testing';

import { AppSerService } from './app-ser.service';

describe('AppSerService', () => {
  let service: AppSerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppSerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
