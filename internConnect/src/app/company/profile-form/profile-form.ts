import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Auth } from '../../core/services/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './profile-form.html',
  styleUrls: ['./profile-form.css'],
})
export class ProfileForm implements OnInit {

   fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  auth = inject(Auth);

  API_URL = "https://internconnect-5n7j.onrender.com/api/company-profile";

  isEditMode = false;

  form = this.fb.group({
    companyId: [{ value: 0, disabled: true }, Validators.required],
    companyName: ['', Validators.required],
    email: [''],
    phone: [''],
    location: [''],
    establishedYear: [''],
    description: [''],
    companySize: [''],
  });

  ngOnInit(): void {
    const companyId = this.auth.getCompanyId();

    if (!companyId) {
      Swal.fire('Not logged in', 'Please login first', 'warning');
      this.router.navigate(['/login-company']);
      return;
    }

    this.form.patchValue({ companyId: Number(companyId) });

    // LOAD PROFILE
    this.http.get(`${this.API_URL}/${companyId}`).subscribe({
      next: (res: any) => {
        this.isEditMode = true;
        this.form.patchValue(res);
      },
      error: (err) => {
        if (err.status === 404) {
          this.isEditMode = false; // New Profile
        } else {
          Swal.fire('Error', 'Failed to load profile', 'error');
        }
      },
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      Swal.fire('Error', 'Fill required fields', 'error');
      return;
    }

    const payload = this.form.getRawValue();

    if (this.isEditMode) {
      // UPDATE
      this.http.put(`${this.API_URL}/${payload.companyId}`, payload).subscribe({
        next: () => {
          Swal.fire('Updated!', 'Profile updated successfully', 'success');
          this.router.navigate(['/dashboard/profile']);
        },
        error: () => Swal.fire('Error', 'Update failed', 'error'),
      });

    } else {
      // CREATE
      this.http.post(this.API_URL, payload).subscribe({
        next: () => {
          Swal.fire('Created!', 'Profile created successfully', 'success');
          this.router.navigate(['/dashboard/profile']);
        },
        error: () => Swal.fire('Error', 'Create failed', 'error'),
      });
    }
  }
}
