import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-student-profile-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './student-profile-form.html',
  styleUrls: ['./student-profile-form.css'],
})
export class StudentProfileForm implements OnInit {

  profileForm!: FormGroup;
  studentId!: number;
  isEditMode = false;

  API_URL = 'http://internconnect-5n7j.onrender.com/api/student-profile';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {

    const id = this.auth.getStudentId();

    if (!id) {
      Swal.fire('Not logged in', 'Please login again', 'warning');
      this.router.navigate(['/login']);
      return;
    }

    this.studentId = Number(id);

    this.profileForm = this.fb.group({
      fullName: ['',Validators.required],
      studentId: [{ value: this.studentId, disabled: true }],
      dateOfBirth: [''],
      gender: [''],
      city: [''],
      state: [''],
      about: ['']
    });

    this.loadProfile();
  }

  loadProfile() {
    this.http.get(`${this.API_URL}/${this.studentId}`).subscribe({
      next: (res: any) => {
        this.isEditMode = true;
        this.profileForm.patchValue(res);
      },
      error: (err) => {
        if (err.status === 404) {
          this.isEditMode = false;
        } else {
          Swal.fire('Error', 'Failed to load profile', 'error');
        }
      }
    });
  }

  saveProfile() {

    const payload = this.profileForm.getRawValue();

    if (this.isEditMode) {
      // UPDATE
      this.http.put(`${this.API_URL}/${this.studentId}`, payload).subscribe({
        next: () => {
          Swal.fire('Updated', 'Profile updated successfully', 'success');
          this.router.navigate(['/student-dashboard']); // NEXT FORM
        },
        error: () => Swal.fire('Error', 'Update failed', 'error')
      });

    } else {
      // CREATE
      this.http.post(this.API_URL, payload).subscribe({
        next: () => {
          Swal.fire('Saved', 'Profile saved successfully', 'success');
          this.router.navigate(['/student-dashboard']); // NEXT FORM
        },
        error: () => Swal.fire('Error', 'Save failed', 'error')
      });
    }
  }
}
