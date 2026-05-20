import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-resume-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './resume-form.html',
  styleUrls: ['./resume-form.css'],
})
export class ResumeForm implements OnInit {

  resumeForm!: FormGroup;
  studentId!: number;
  selectedFile: File | null = null;
  API_URL = 'http://internconnect-5n7j.onrender.com/api/resume';

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

    this.resumeForm = this.fb.group({
      resume: [null]
    });

    this.loadResume();
  }

  resumeUrl: string = '';

loadResume() {
  this.http.get<any>(`${this.API_URL}/${this.studentId}`).subscribe({
    next: (res) => {
      if (res && res.fileUrl) {
        this.resumeUrl = `http://internconnect-5n7j.onrender.com/${res.fileUrl}`;
      }
    }
  });
}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  saveResume() {
  if (this.selectedFile) {

    const formData = new FormData();

    // ✅ key MUST be "file" (backend match)
    formData.append('file', this.selectedFile);

    this.http.post(
      `${this.API_URL}/${this.studentId}`, // ✅ correct URL
      formData
    ).subscribe({
      next: () => {
        Swal.fire('Success', 'Resume uploaded', 'success');
        this.router.navigate(['/student-dashboard']);
      },
      error: () => {
        Swal.fire('Error', 'Failed to upload', 'error');
      }
    });

  } else {
    Swal.fire('Warning', 'Please select a file', 'warning');
  }
}
}