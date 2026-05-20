import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-skills-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './skills-form.html',
  styleUrls: ['./skills-form.css'],
})
export class SkillsForm implements OnInit {

  skillsForm!: FormGroup;
  studentId!: number;
  API_URL = 'http://internconnect-5n7j.onrender.com/api/skills';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private auth: Auth,
    public router: Router
  ) {}

  ngOnInit(): void {
    const id = this.auth.getStudentId();
    if (!id) {
      Swal.fire('Not logged in', 'Please login again', 'warning');
      this.router.navigate(['/login']);
      return;
    }
    this.studentId = Number(id);

    this.skillsForm = this.fb.group({
      skills: ['', Validators.required]
    });

    this.loadSkills();
  }

  loadSkills() {
  this.http.get<any[]>(`${this.API_URL}/${this.studentId}`).subscribe({
    next: (res) => {
      if (res && res.length > 0) {

        // Convert array → comma string
        const skillsString = res.map(s => s.skillName).join(', ');

        this.skillsForm.patchValue({
          skills: skillsString
        });
      }
    }
  });
}

  saveSkills() {
  if (this.skillsForm.valid) {

    const skills = this.skillsForm.value.skills;

    this.http.post(
      `${this.API_URL}/${this.studentId}`,
      skills,
      { headers: { 'Content-Type': 'text/plain' } }
    ).subscribe({
      next: () => {
        Swal.fire('Success', 'Skills saved', 'success');
        this.router.navigate(['/student-dashboard/projects-form']);
      },
      error: () => {
        Swal.fire('Error', 'Failed to save', 'error');
      }
    });
  }
}
}