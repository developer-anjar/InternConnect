import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = () => {

  const auth = inject(Auth);
  const router = inject(Router);

  const token = auth.getToken();
  const studentId = auth.getStudentId();
  const companyId = auth.getCompanyId();

  // 🔐 If not logged in
  if (!token) {

    Swal.fire({
      icon: 'warning',
      title: 'Login Required',
      text: 'Please login to continue',
      confirmButtonText: 'Go to Login'
    }).then(() => {

      router.navigate(['/login']);

    });

    return false;
  }

  // 🎓 Student logged in
  if (studentId) {
    return true;
  }

  // 🏢 Company logged in
  if (companyId) {
    return true;
  }

  // ❌ Fallback
  router.navigate(['/login']);
  return false;
};