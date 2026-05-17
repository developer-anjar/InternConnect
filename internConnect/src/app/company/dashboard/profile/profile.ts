import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule ,FormBuilder,FormGroup,Validators} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-profile',
  imports: [CommonModule,ReactiveFormsModule,HttpClientModule,RouterModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {

  getCompanyInitials(name: string): string {
  if (!name) return '';

  const words = name.trim().split(' ');
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }

  return (
    words[0].charAt(0) + words[1].charAt(0)
  ).toUpperCase();
}

getLogoGradient(name: string): string {
  if (!name) return 'linear-gradient(135deg, #1976D2, #26A69A)';

  const gradients = [
    'linear-gradient(135deg, #1976D2, #42A5F5)',
    'linear-gradient(135deg, #26A69A, #00ACC1)',
    'linear-gradient(135deg, #1976D2, #26A69A)',
    'linear-gradient(135deg, #00ACC1, #26A69A)',
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return gradients[Math.abs(hash) % gradients.length];
}


  http = inject(HttpClient);
  router = inject(Router);
  auth = inject(Auth);

  API_URL = "http://localhost:8080/api/company-profile";

  profile: any = null;
  loading = true;

  ngOnInit(): void {
    const companyId = this.auth.getCompanyId();

    if (!companyId) {
      Swal.fire('Error', 'Please login first', 'warning');
      this.router.navigate(['/login-company']);
      return;
    }

    this.http.get(`${this.API_URL}/${companyId}`).subscribe({
      next: (res) => {
        this.profile = res;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 404) {
          this.profile = null; // No profile found
        } else {
          Swal.fire('Error', 'Failed to load profile', 'error');
        }
      },
    });
  }

  goEdit() {
    this.router.navigate(['/company-profile-form']);
  }
}