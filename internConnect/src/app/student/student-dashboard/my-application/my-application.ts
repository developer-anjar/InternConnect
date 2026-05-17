import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Auth } from '../../../core/services/auth';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-application',
  imports: [CommonModule,ReactiveFormsModule,RouterModule,HttpClientModule],
  templateUrl: './my-application.html',
  styleUrl: './my-application.css',
})
export class MyApplication implements OnInit {

  http = inject(HttpClient);
  auth = inject(Auth);
  router = inject(Router);

  applications: any[] = [];
  loading = true;

  API_URL = 'http://localhost:8080/api/student/internship/applications';

  ngOnInit(): void {

    const studentId = this.auth.getStudentId();

    if (!studentId) {
      Swal.fire('Error', 'Please login again', 'warning');
      return;
    }

    this.http.get<any[]>(`${this.API_URL}/${studentId}`).subscribe({
      next: (res) => {
        this.applications = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        Swal.fire('Error', 'Failed to load applications', 'error');
      }
    });
  }

  getStatusIcon(status: string): string {
    switch (status?.toUpperCase()) {
      case 'PENDING':
        return 'bi-clock';
      case 'APPROVED':
      case 'ACCEPTED':
        return 'bi-check-circle';
      case 'REJECTED':
        return 'bi-x-circle';
      case 'REVIEWED':
        return 'bi-eye';
      case 'INTERVIEW':
        return 'bi-chat-dots';
      default:
        return 'bi-question-circle';
    }
  }

  getStatusClass(status: string): string {
    switch (status?.toUpperCase()) {
      case 'PENDING':
        return 'bg-warning text-dark';
      case 'APPROVED':
      case 'ACCEPTED':
        return 'bg-success';
      case 'REJECTED':
        return 'bg-danger';
      case 'REVIEWED':
        return 'bg-info';
      case 'INTERVIEW':
        return 'bg-primary';
      default:
        return 'bg-secondary';
    }
  }

  recheckStatus(application: any) {
    // Refresh the applications list
    this.loading = true;
    const studentId = this.auth.getStudentId();
    if (studentId) {
      this.http.get<any[]>(`${this.API_URL}/${studentId}`).subscribe({
        next: (res) => {
          this.applications = res;
          this.loading = false;
          Swal.fire('Success', 'Applications refreshed', 'success');
        },
        error: () => {
          this.loading = false;
          Swal.fire('Error', 'Failed to refresh applications', 'error');
        }
      });
    }
  }

  viewInternship(application: any) {
    // Navigate to internship details page
    if (application.internshipId) {
      this.router.navigate(['/internship-details', application.internshipId]);
    } else {
      Swal.fire('Error', 'Internship details not available', 'error');
    }
  }
}

