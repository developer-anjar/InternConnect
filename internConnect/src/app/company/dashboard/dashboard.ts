import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule],
  templateUrl:'./dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit {
  companyName: string = 'Company';

  http = inject(HttpClient);
  auth = inject(Auth);
  router = inject(Router);

  ngOnInit(): void {
    const companyId = this.auth.getCompanyId();
    if (companyId) {
      this.http.get(`http://localhost:8080/api/company-profile/${companyId}`).subscribe({
        next: (res: any) => {
          this.companyName = res.companyName || 'Company';
        },
        error: () => {
          this.companyName = 'Company';
        }
      });
    }
  }

  logout() {
    localStorage.clear(); // or remove token
    this.router.navigate(['/login-company']);
  }
}
