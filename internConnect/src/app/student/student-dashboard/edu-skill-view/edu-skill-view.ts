import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-edu-skill-view',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './edu-skill-view.html',
  styleUrls: ['./edu-skill-view.css']
})
export class EduSkillView implements OnInit {

  education: any[] = [];
  skills: string[] = [];
  loading = true;
  API_URL = 'http://localhost:8080/api/education';

  constructor(private http: HttpClient, private auth: Auth, private router: Router) {}

  ngOnInit(): void {
  const studentId = this.auth.getStudentId();

  if (studentId) {

    // ✅ 1. Education API
    this.http.get<any[]>(`http://localhost:8080/api/education/${studentId}`)
      .subscribe({
        next: (res) => {
          this.education = res || [];
        },
        error: () => {}
      });

    // ✅ 2. Skills API (ADD THIS 🔥)
    this.http.get<any[]>(`http://localhost:8080/api/skills/${studentId}`)
      .subscribe({
        next: (res) => {
          this.skills = res.map(s => s.skillName); // important
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
  }
}

  editEducation() {
    this.router.navigate(['/student-dashboard/education-form']);
  }

  editSkills() {
    this.router.navigate(['/student-dashboard/skills-form']);
  }
}
