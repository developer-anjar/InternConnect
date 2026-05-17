import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { companyGuardGuard } from './company-guard-guard';

describe('companyGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => companyGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
