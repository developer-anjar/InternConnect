import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const studentGuard: CanActivateFn = () => {

  const auth = inject(Auth);
  const router = inject(Router);

  if (auth.getStudentId()) {
    return true;
  }

  router.navigate(['/login']);

  return false;
};