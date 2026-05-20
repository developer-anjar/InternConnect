import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-ai-internship-recommender',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './ai-internship-recommender.html',
  styleUrls: ['./ai-internship-recommender.css'],
})
export class AiInternshipRecommender implements OnInit {

  studentId!: number;
  studentProfile: any = null;
  education: any[] = [];
  skills: string = '';
  projects: any[] = [];
  resumeFileUrl: string = '';
  internships: any[] = [];
  recommendedInternships: any[] = [];
  loading = true;

  API_URL = 'https://internconnect-5n7j.onrender.com/api/student/internship';
  PROFILE_API = 'https://internconnect-5n7j.onrender.com/api/student-profile';
  EDUCATION_API = 'https://internconnect-5n7j.onrender.com/api/education';
  SKILLS_API = 'https://internconnect-5n7j.onrender.com/api/skills';
  PROJECTS_API = 'https://internconnect-5n7j.onrender.com/api/projects';
  RESUME_API = 'https://internconnect-5n7j.onrender.com/api/resume';

  constructor(
    private http: HttpClient,
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.auth.getStudentId();
    if (!id) {
      Swal.fire('Login required', 'Please login first', 'warning');
      this.router.navigate(['/login']);
      return;
    }
    this.studentId = Number(id);

    this.loadStudentData();
   this.http.get<any[]>(`https://internconnect-5n7j.onrender.com/api/ai/recommendations/${this.studentId}`)
.subscribe({
  next: (res) => {
    this.recommendedInternships = res;
    this.loading = false;
  },
  error: () => {
    this.loading = false;
  }
});
  }

  loadStudentData() {
    // Load profile, education, skills, projects, resume
    this.http.get<any>(`${this.PROFILE_API}/${this.studentId}`).subscribe({
      next: (res) => this.studentProfile = res,
      error: () => this.studentProfile = null
    });

    this.http.get<any[]>(`${this.EDUCATION_API}/${this.studentId}`).subscribe({
      next: (res) => this.education = res || [],
      error: () => this.education = []
    });

    this.http.get<any[]>(`${this.SKILLS_API}/${this.studentId}`).subscribe({
      next: (res) => this.skills = res.map((s: any) => s.skillName).join(', '),
      error: () => this.skills = ''
    });

    this.http.get<any[]>(`${this.PROJECTS_API}/${this.studentId}`).subscribe({
      next: (res) => this.projects = res || [],
      error: () => this.projects = []
    });

    this.http.get<any>(`${this.RESUME_API}/${this.studentId}`).subscribe({
      next: (res) => this.resumeFileUrl = res.resumeFileUrl || '',
      error: () => this.resumeFileUrl = ''
    });
  }


  viewInternshipDetails(internshipId: number) {
    this.router.navigate(['/internship-details', internshipId]);
  }
}