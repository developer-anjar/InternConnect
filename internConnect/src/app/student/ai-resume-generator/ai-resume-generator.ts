import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-ai-resume-generator',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './ai-resume-generator.html',
  styleUrls: ['./ai-resume-generator.css'],
})
export class AiResumeGenerator implements OnInit {

  studentId!: number;
  studentProfile: any = null;
  education: any[] = [];
  skills: string = '';
  projects: any[] = [];
  resumeFileUrl: string = '';
  generatedResume: string = '';
  loading = false;

  API_URL = 'http://internconnect-5n7j.onrender.com/api/student-profile';
  EDUCATION_API = 'http://internconnect-5n7j.onrender.com/api/education';
  SKILLS_API = 'http://internconnect-5n7j.onrender.com/api/skills';
  PROJECTS_API = 'http://internconnect-5n7j.onrender.com/api/projects';
  RESUME_API = 'http://internconnect-5n7j.onrender.com/api/resume';
  GENERATE_API = 'http://internconnect-5n7j.onrender.com/api/ai/generate-resume';

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
  }

  loadStudentData() {
    this.http.get<any>(`${this.API_URL}/${this.studentId}`).subscribe({
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

  generateResume() {
    if (!this.studentProfile || this.education.length === 0) {
      Swal.fire('Incomplete Profile', 'Please complete your profile and education to generate a resume.', 'warning');
      return;
    }

    this.loading = true;
    const payload = {
      studentId: this.studentId,
      profile: this.studentProfile,
      education: this.education,
      skills: this.skills,
      projects: this.projects
    };

    this.http.post<any>(this.GENERATE_API, payload).subscribe({
      next: (res) => {
        this.generatedResume = res.resumeContent || this.fallbackGenerate();
        this.loading = false;
        Swal.fire('Success', 'Resume generated successfully!', 'success');
      },
      error: () => {
        this.generatedResume = this.fallbackGenerate();
        this.loading = false;
        Swal.fire('Generated Locally', 'AI service unavailable, generated basic resume.', 'info');
      }
    });
  }

  fallbackGenerate(): string {
    let resume = `# ${this.studentProfile?.fullName || 'Student Name'}\n\n`;
    resume += `## Contact Information\n`;
    resume += `- Email: ${this.studentProfile?.email || 'N/A'}\n`;
    resume += `- Phone: ${this.studentProfile?.phone || 'N/A'}\n`;
    resume += `- Location: ${this.studentProfile?.city || ''}, ${this.studentProfile?.state || ''}\n\n`;

    resume += `## Education\n`;
    this.education.forEach(edu => {
      resume += `- ${edu.course} at ${edu.institute} (${edu.duration})\n`;
    });
    resume += '\n';

    resume += `## Skills\n${this.skills}\n\n`;

    resume += `## Projects\n`;
    this.projects.forEach(proj => {
      resume += `- ${proj.title}: ${proj.description}\n`;
    });

    return resume;
  }

  downloadResume() {
    const blob = new Blob([this.generatedResume], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated_resume.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}