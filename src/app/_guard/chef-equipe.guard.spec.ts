import { TestBed } from '@angular/core/testing';

import { ChefEquipeGuard } from './chef-equipe.guard';

describe('ChefEquipeGuard', () => {
  let guard: ChefEquipeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ChefEquipeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
