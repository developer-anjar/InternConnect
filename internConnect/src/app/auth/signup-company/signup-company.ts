import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-signup-company',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './signup-company.html',
  styleUrls: ['./signup-company.css'] // Updated to use styleUrls
})
export class SignupCompany implements OnInit {

  signupForm: FormGroup;
  userType: string = 'company';  // This is the default form type
  isFlipped = false;  // For flip effect

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public router: Router,
    private auth: Auth
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  // Password match validation
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  // Handle signup form submission
  onSignUp() {
  if (this.signupForm.invalid) {
    Swal.fire('Error', 'Please fill all required fields correctly', 'error');
    return;
  }

  const signupData = {
    name: this.signupForm.value.name,
    email: this.signupForm.value.email,
    password: this.signupForm.value.password
  };

  this.http.post('https://internconnect-5n7j.onrender.com/api/company/signup', signupData).subscribe({
    next: (res: any) => {
      Swal.fire('Success', 'Signup successful!', 'success');
      this.router.navigate(['/login-company']);
    },
    error: (err) => {
      Swal.fire('Error', err.error || 'Signup failed', 'error');
    }
  });
}

  }

  // Toggle flip effect
  
