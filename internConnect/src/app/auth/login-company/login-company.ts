import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../core/services/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-company',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './login-company.html',
  styleUrls: ['./login-company.css'],
})
export class LoginCompany {
userType: string = 'student';
  forgotOpen: boolean = false;
  forgotEmail: string = '';
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public router: Router,
    private auth: Auth
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  setUserType(type: string) { this.userType = type; }

  openForgotPassword(event: Event) { event.preventDefault(); this.forgotOpen = true; }

  sendForgotEmail() {
    if (!this.forgotEmail) {
      Swal.fire('Error', 'Please enter your email', 'error');
      return;
    }
    this.http.post('https://internconnect-5n7j.onrender.com/api/company/forgot-password', { email: this.forgotEmail }).subscribe({
      next: () => { Swal.fire('Success', 'Password reset email sent!', 'success'); this.forgotOpen = false; },
      error: () => { Swal.fire('Error', 'Failed to send reset link', 'error'); }
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const loginData = { ...this.loginForm.value, userType: this.userType };
      this.http.post('https://internconnect-5n7j.onrender.com/api/company/login', loginData).subscribe({
        next: (res: any) => {
          const token = res.token || 'myAuthToken';
          this.auth.login(token, 'company');
          if (res.companyId) {
            this.auth.setCompanyId(res.companyId); // <-- Store companyId here
          }
          Swal.fire({ position: 'center', icon: 'success', title: 'Login successful!', showConfirmButton: false, timer: 1500 });
          this.router.navigate(['/company-profile-form']);
        },
        error: (err) => { Swal.fire('Login failed', err.error?.message || 'Invalid credentials', 'error'); }
      });
    }
  }
}