import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-projects-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './projects-form.html',
  styleUrls: ['./projects-form.css'],
})
export class ProjectsForm implements OnInit {

  projectsForm!: FormGroup;
  studentId!: number;
  API_URL = 'http://localhost:8080/api/projects';

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

    this.projectsForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      tech: ['']
    });

    this.loadProjects();
  }

  loadProjects() {
  this.http.get<any[]>(`${this.API_URL}/${this.studentId}`).subscribe({
    next: (res) => {
      if (res && res.length > 0) {
        const proj = res[0];

        this.projectsForm.patchValue({
          title: proj.title,
          description: proj.description,
          tech: proj.tech
        });
      }
    }
  });
}

  saveProjects() {
    if (this.projectsForm.valid) {
      const formValue = this.projectsForm.value;
      const payload = this.projectsForm.value;

      this.http.post(`${this.API_URL}/${this.studentId}`, payload).subscribe({
        next: () => {
          Swal.fire('Success', 'Projects saved', 'success');
          this.router.navigate(['/student-dashboard/resume-form']);
        },
        error: () => {
          Swal.fire('Error', 'Failed to save', 'error');
        }
      });
    }
  }
}