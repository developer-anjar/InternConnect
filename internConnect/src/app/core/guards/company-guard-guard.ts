import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const companyGuard: CanActivateFn = () => {

  const auth = inject(Auth);
  const router = inject(Router);

  if (auth.getCompanyId()) {
    return true;
  }

  router.navigate(['/login-company']);

  return false;
};