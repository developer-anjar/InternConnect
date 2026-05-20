import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-manage-internships',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,HttpClientModule,RouterModule],
  templateUrl: './manage-internships.html',
  styleUrls: ['./manage-internships.css'],
})
export class ManageInternships implements OnInit {

  http = inject(HttpClient);
  router = inject(Router);
  auth = inject(Auth);

  internships: any[] = [];
  companyId!: number;

  API_URL = 'http://internconnect-5n7j.onrender.com/api/company/internship';

  ngOnInit(): void {

    const id = this.auth.getCompanyId();
    if (!id) {
      this.router.navigate(['/login-company']);
      return;
    }

    this.companyId = Number(id);
    this.loadInternships();
  }

  loadInternships() {
    this.http.get<any[]>(`${this.API_URL}/company/${this.companyId}`).subscribe(res => {
      this.internships = res;
    });
  }

  edit(id: number) {
    this.router.navigate(['/company/internship/edit', id]);
  }

  delete(id: number) {
    Swal.fire({
      title: 'Delete Internship?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete'
    }).then(result => {
      if (result.isConfirmed) {
        this.http.delete(`${this.API_URL}/${id}`).subscribe(() => {
          Swal.fire('Deleted', 'Internship removed', 'success');
          this.loadInternships();
        });
      }
    });
  }

  addNew() {
    this.router.navigate(['/company/internship/new']);
  }
}