import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { InternshipService } from '../../../core/services/internship';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-add-internships',
  imports: [CommonModule,RouterModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './add-internships.html',
  styleUrls: ['./add-internships.css'],
})
export class AddInternships implements OnInit {

  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  route = inject(ActivatedRoute);
  auth = inject(Auth);

  API_URL = 'http://internconnect-5n7j.onrender.com/api/company/internship';

  form!: FormGroup;
  isEditMode = false;
  internshipId!: number;
  companyId!: number;

  ngOnInit(): void {

    const id = this.auth.getCompanyId();
    if (!id) {
      Swal.fire('Not logged in', 'Please login first', 'warning');
      this.router.navigate(['/login-company']);
      return;
    }

    this.companyId = Number(id);

   this.form = this.fb.group({

  // Company
  companyName: ['', Validators.required],
  companyWebsite: [''],
  companyLocation: ['', Validators.required],
  industryDomain: ['', Validators.required],
  aboutCompany: ['', Validators.required],

  // Internship
  internshipTitle: ['', Validators.required],
  department: ['', Validators.required],
  internshipType: ['REMOTE', Validators.required],
  duration: [1, Validators.required],
  startDate: ['', Validators.required],
  workingHours: ['FULL_TIME', Validators.required],

  // Role
  jobDescription: ['', Validators.required],
  dailyTasks: ['', Validators.required],
  toolsUsed: [''],
  projects: [''],

  // Eligibility
  skills: ['', Validators.required],
  qualification: ['', Validators.required],
  year: [''],
  experience: [''],
  language: [''],

  // Benefits
  stipend: [0, Validators.required],
  paymentMode: ['MONTHLY'],
  certificate: [false],
  lor: [false],
  ppo: [false],
  benefits: [''],

  // Application
  openings: [1, Validators.required],
  lastDate: ['', Validators.required],
  applyLink: ['', Validators.required],
  process: [''],
  hrEmail: ['', Validators.required],

  // Extra
  level: ['BEGINNER'],
  tags: [''],

  // System
  status: ['ACTIVE']
});


    this.internshipId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.internshipId) {
      this.isEditMode = true;
      this.loadInternship();
    }
  }

  loadInternship() {
    this.http.get<any>(`${this.API_URL}/${this.internshipId}`).subscribe(res => {
      this.form.patchValue(res);
    });
  }

  onSubmit() {

    if (this.form.invalid) {
      Swal.fire('Error', 'Fill required fields', 'error');
      return;
    }

    const payload = {
      companyId: this.companyId,
      ...this.form.value
    };

    if (this.isEditMode) {
      this.http.put(`${this.API_URL}/${this.internshipId}`, payload).subscribe({
        next: () => {
          Swal.fire('Updated', 'Internship updated successfully', 'success');
          this.router.navigate(['/dashboard/manage-internship']);
        },
        error: () => Swal.fire('Error', 'Update failed', 'error')
      });
    } else {
      this.http.post(this.API_URL, payload).subscribe({
        next: () => {
          Swal.fire('Created', 'Internship posted successfully', 'success');
          this.router.navigate(['/dashboard/manage-internship']);
        },
        error: () => Swal.fire('Error', 'Creation failed', 'error')
      });
    }
  }
}
