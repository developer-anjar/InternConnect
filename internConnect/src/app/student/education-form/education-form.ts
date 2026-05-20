import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-education-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './education-form.html',
  styleUrls: ['./education-form.css'],
})
export class EducationForm implements OnInit {

  educationForm!: FormGroup;
  studentId!: number;
  API_URL = 'http://internconnect-5n7j.onrender.com/api/education';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private auth: Auth,
    public router: Router
  ) {}

  ngOnInit(): void {
    const id = this.auth.getStudentId();
    if (!id) {
      Swal.fire('Not logged in', 'Please login again', 'warning');
      this.router.navigate(['/login']);
      return;
    }
    this.studentId = Number(id);

    this.educationForm = this.fb.group({
      course: ['', Validators.required],
      institute: ['', Validators.required],
      duration: ['', Validators.required],
      score: ['']
    });

    // Load existing education if available
    this.loadEducation();
  }

  loadEducation() {
  this.http.get<any[]>(`${this.API_URL}/${this.studentId}`).subscribe({
    next: (res) => {
      if (res && res.length > 0) {
        const edu = res[0];

        this.educationForm.patchValue({
          course: edu.course,
          institute: edu.institute,
          duration: edu.duration,
          score: edu.score
        });
      }
    }
  });
}

  saveEducation() {
    if (this.educationForm.valid) {
      const formValue = this.educationForm.value;
      const payload = this.educationForm.value;

      this.http.post(`${this.API_URL}/${this.studentId}`, payload).subscribe({
        next: () => {
          Swal.fire('Success', 'Education saved', 'success');
          this.router.navigate(['/student-dashboard/skills-form']); // Next step
        },
        error: () => {
          Swal.fire('Error', 'Failed to save', 'error');
        }
      });
    }
  }
}