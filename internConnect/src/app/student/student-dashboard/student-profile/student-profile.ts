import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-student-profile',
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './student-profile.html',
  styleUrls: ['./student-profile.css'],
})
export class StudentProfile implements OnInit {

  student: any = null;
  recentApplications: any[] = [];
  loading = true;

  private profileApi = 'http://localhost:8080/api/student-profile';
  private applicationsApi = 'http://localhost:8080/api/student/internship/applications';

  constructor(
    private http: HttpClient,
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    const studentId = this.auth.getStudentId();
    if (!studentId) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadProfile(Number(studentId));
    this.loadApplications(Number(studentId));
  }

  loadProfile(studentId: number) {
    this.http.get<any>(`${this.profileApi}/${studentId}`).subscribe({
      next: (res) => {
        this.student = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  loadApplications(studentId: number) {
    this.http.get<any[]>(`${this.applicationsApi}/${studentId}`).subscribe({
      next: (res) => {
        this.recentApplications = (res || []).slice(0, 3);
      },
      error: () => {
        this.recentApplications = [];
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getInitials(name: string = 'Student'): string {
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
  }

  getApplicationTitle(application: any): string {
    return application?.internshipTitle || application?.companyName || application?.profile || 'Recent application';
  }
}
