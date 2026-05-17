import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../core/services/auth';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule,FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login implements OnInit {

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
    this.http.post('http://localhost:8080/api/student/forgot-password', { email: this.forgotEmail }).subscribe({
      next: () => { Swal.fire('Success', 'Password reset email sent!', 'success'); this.forgotOpen = false; },
      error: () => { Swal.fire('Error', 'Failed to send reset link', 'error'); }
    });
  }

 onLogin() {
  if (this.loginForm.valid) {

    this.http.post('http://localhost:8080/api/student/login', this.loginForm.value)
      .subscribe({
        next: (res: any) => {

          // backend does not send token → create dummy like company
          const token = 'dummy-student-token';
          this.auth.login(token, 'student');

          // SAVE STUDENT ID
          if (res.studentId) {
            this.auth.setStudentId(res.studentId);
          }

          if (res.name) {
            this.auth.setStudentName(res.name);
          }

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Login successful!',
            showConfirmButton: false,
            timer: 1500
          });

          this.router.navigate(['/student-profile-form']);
        },
        error: (err) => {
          Swal.fire(
            'Login failed',
            err.error || 'Invalid credentials',
            'error'
          );
        }
      });
  }
}

}