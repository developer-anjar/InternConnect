import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-project-resume-view',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './project-resume-view.html',
  styleUrls: ['./project-resume-view.css']
})
export class ProjectResumeView implements OnInit {

  projects: any[] = [];
  resumeUrl: string = '';
  loading = true;
  API_URL = 'http://localhost:8080/api/projects';

  constructor(private http: HttpClient, private auth: Auth, private router: Router) {}

  ngOnInit(): void {
  const studentId = this.auth.getStudentId();

  if (studentId) {
    forkJoin({
      projects: this.http.get<any[]>(`http://localhost:8080/api/projects/${studentId}`),
      resume: this.http.get<any>(`http://localhost:8080/api/resume/${studentId}`)
    }).subscribe({
      next: (res) => {
        this.projects = res.projects || [];
        this.resumeUrl = res.resume?.fileUrl
          ? `http://localhost:8080/${res.resume.fileUrl}`
          : '';
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}

  editProjects() {
    this.router.navigate(['/student-dashboard/projects-form']);
  }

  editResume() {
    this.router.navigate(['/student-dashboard/resume-form']);
  }
}
