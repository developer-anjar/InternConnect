import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule,RouterModule,HttpClientModule],
  templateUrl: './applications.html',
  styleUrls: ['./applications.css'],
})
export class Applications implements OnInit {

  http = inject(HttpClient);
  auth = inject(Auth);

  applications: any[] = [];
  loading = true;
  showModal = false;
  selectedApplication: any = null;

  API_URL = 'https://internconnect-5n7j.onrender.com/api/company/applications';

  ngOnInit(): void {

    const companyId = this.auth.getCompanyId();

    if (!companyId) {
      Swal.fire('Error', 'Please login again', 'warning');
      return;
    }

    this.http.get<any[]>(`${this.API_URL}/${companyId}`).subscribe({
      next: (res) => {
        this.applications = res;
        this.loadStudentDetails();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        Swal.fire('Error', 'Failed to load applications', 'error');
      }
    });
  }

  loadStudentDetails() {
    // Get unique student IDs
    const studentIds = [...new Set(this.applications.map(app => app.studentId))];

    // For each student, fetch all their data using forkJoin
    const studentDataObservables = studentIds.map(studentId => {
      return forkJoin({
        profile: this.http.get<any>(`http://internconnect-5n7j.onrender.com/api/student-profile/${studentId}`),
        education: this.http.get<any[]>(`http://internconnect-5n7j.onrender.com/api/education/${studentId}`),
        skills: this.http.get<any>(`http://internconnect-5n7j.onrender.com/api/skills/${studentId}`),
        projects: this.http.get<any[]>(`http://internconnect-5n7j.onrender.com/api/projects/${studentId}`),
        resume: this.http.get<any>(`http://internconnect-5n7j.onrender.com/api/resume/${studentId}`)
      });
    });

    // Execute all forkJoin observables
    forkJoin(studentDataObservables).subscribe({
      next: (results) => {
        // Create a map of studentId -> studentData
        const studentMap = new Map();
        results.forEach((data, index) => {
          const studentId = studentIds[index];
          studentMap.set(studentId, {
            profile: data.profile || null,
            education: data.education || [],
            skills: data.skills?.skills || '',
            projects: data.projects || [],
            resume: data.resume?.fileUrl || data.resume?.resume?.fileUrl || ''
          });
        });

        // Attach student data to applications
        this.applications = this.applications.map(app => ({
          ...app,
          studentData: studentMap.get(app.studentId) || null
        }));
      },
      error: () => {
        console.log('Some student data could not be loaded');
      }
    });
  }

  updateStatus(applicationId: number, status: string) {

    Swal.fire({
      title: `Are you sure?`,
      text: `You want to ${status.toLowerCase()} this application`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes'
    }).then(result => {

      if (result.isConfirmed) {
        this.http.put(
          `${this.API_URL}/${applicationId}/status?status=${status}`,
          {}
        ).subscribe({
          next: () => {
            Swal.fire('Success', `Application ${status}`, 'success');
            this.refresh();
          },
          error: () => Swal.fire('Error', 'Action failed', 'error')
        });
      }
    });
  }

  refresh() {
    this.ngOnInit();
  }

  viewStudentDetails(application: any) {
    this.selectedApplication = application;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedApplication = null;
  }
}