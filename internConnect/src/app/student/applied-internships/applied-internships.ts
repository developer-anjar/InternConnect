import { CommonModule } from '@angular/common';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-applied-internships',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './applied-internships.html',
  styleUrls: ['./applied-internships.css'],
})
export class AppliedInternships {
 API_URL = 'http://localhost:8080/api/student/internship/applications';

  applications: any[] = [];
  studentId!: number;
  loading = true;

  constructor(private http: HttpClient, private auth: Auth) {}

  ngOnInit(): void {

    const id = this.auth.getStudentId();

    if (!id) return;

    this.studentId = Number(id);

    this.http.get<any[]>(`${this.API_URL}/${this.studentId}`).subscribe(res => {

      this.applications = res;
      this.loading = false;

    });
  }
}
