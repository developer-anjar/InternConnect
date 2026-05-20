import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-internship-details',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './internship-details.html',
  styleUrls: ['./internship-details.css'],
})
export class InternshipDetails implements OnInit {

  API_URL = 'http://internconnect-5n7j.onrender.com/api/student/internship';
  PROFILE_API = 'http://internconnect-5n7j.onrender.com/api/student-profile';
  EDUCATION_API = 'http://internconnect-5n7j.onrender.com/api/education';
  SKILLS_API = 'http://internconnect-5n7j.onrender.com/api/skills';
  PROJECTS_API = 'http://internconnect-5n7j.onrender.com/api/projects';
  RESUME_API = 'http://internconnect-5n7j.onrender.com/api/resume';

  internship: any = null;
  studentProfile: any = null;
  education: any[] = [];
  skills: string = '';
  projects: any[] = [];
  resumeFileUrl: string = '';
  studentId!: number;
  applied = false;
  loading = true;
  showModal = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private auth: Auth
  ) {}

  // ================= INIT =================
  ngOnInit(): void {

    const id = this.auth.getStudentId();

    if (!id) {
      Swal.fire('Login required', 'Please login first', 'warning');
      this.router.navigate(['/login']);
      return;
    }

    this.studentId = Number(id);

    const internshipId = this.route.snapshot.paramMap.get('id');

    if (!internshipId) {
      Swal.fire('Error', 'Invalid Internship ID', 'error');
      this.router.navigate(['/student-dashboard/internship-list']);
      return;
    }

    this.loadStudentProfile();
    this.loadEducation();
    this.loadSkills();
    this.loadProjects();
    this.loadResume();
    this.loadInternship(internshipId);
  }

  // ================= LOAD STUDENT PROFILE =================
  loadStudentProfile() {
    this.http.get<any>(`${this.PROFILE_API}/${this.studentId}`).subscribe({
      next: (res) => {
        this.studentProfile = res;
      },
      error: () => {
        this.studentProfile = null;
      }
    });
  }

  loadEducation() {
    this.http.get<any>(`${this.EDUCATION_API}/${this.studentId}`).subscribe({
      next: (res) => {
        this.education = res?.education ?? [];
      },
      error: () => {
        this.education = [];
      }
    });
  }

  loadSkills() {
    this.http.get<any>(`${this.SKILLS_API}/${this.studentId}`).subscribe({
      next: (res) => {
        this.skills = res?.skills ?? '';
      },
      error: () => {
        this.skills = '';
      }
    });
  }

  loadProjects() {
    this.http.get<any>(`${this.PROJECTS_API}/${this.studentId}`).subscribe({
      next: (res) => {
        this.projects = res ?? [];
      },
      error: () => {
        this.projects = [];
      }
    });
  }

  loadResume() {
    this.http.get<any>(`${this.RESUME_API}/${this.studentId}`).subscribe({
      next: (res) => {
        this.resumeFileUrl = res?.fileUrl ?? res?.resume?.fileUrl ?? '';
      },
      error: () => {
        this.resumeFileUrl = '';
      }
    });
  }

  // ================= LOAD INTERNSHIP =================
  loadInternship(id: string) {

    this.loading = true;

    this.http.get<any>(`${this.API_URL}/${id}`).subscribe({

      next: (res) => {

        this.internship = {

          id: res.internshipId ?? res.id,
          companyId: res.companyId ?? null,
          internshipTitle: res.internshipTitle ?? res.title ?? 'Not Available',
          companyName: res.companyName ?? res.company ?? 'Unknown Company',
          industryDomain: res.industryDomain ?? res.domain ?? 'General',
          internshipType: res.internshipType ?? res.type ?? 'INTERNSHIP',
          companyLocation: res.companyLocation ?? res.location ?? 'Not specified',
          workingHours: res.workingHours ?? 'Flexible',
          duration: res.duration ?? res.durationMonths ?? 0,
          stipend: res.stipend ?? 0,
          startDate: res.startDate ?? null,
          openings: res.openings ?? 0,
          lastDate: res.lastDate ?? res.applyBy ?? null,
          views: res.views ?? 0,
          aboutCompany: res.aboutCompany ?? res.companyAbout ?? 'No info available',
          jobDescription: res.jobDescription ?? res.description ?? 'Not specified',
          dailyTasks: res.dailyTasks ?? res.tasks ?? 'Not specified',
          toolsUsed: res.toolsUsed ?? null,
          projects: res.projects ?? null,
          skills: res.skills ?? 'Not specified',
          qualification: res.qualification ?? 'Any',
          year: res.year ?? null,
          experience: res.experience ?? null,
          language: res.language ?? null,
          paymentMode: res.paymentMode ?? 'Online',
          certificate: res.certificate ?? false,
          lor: res.lor ?? false,
          ppo: res.ppo ?? false,
          benefits: res.benefits ?? null,
          process: res.process ?? null,
          hrEmail: res.hrEmail ?? 'Not provided',
          applyLink: res.applyLink ?? '#'
        };

        console.log("Loaded Internship:", this.internship);

        this.loading = false;
      },

      error: (err) => {
        console.error("Load error:", err);
        this.loading = false;
        Swal.fire('Error', 'Internship not found', 'error');
      }

    });
  }

  // ================= CHECK PROFILE COMPLETENESS =================
  isProfileComplete(): boolean {
    if (!this.studentProfile) return false;

    const hasFullName = !!this.studentProfile.fullName?.trim();
    const hasSkills = !!this.skills?.trim();
    const hasEducation = !!this.education?.length;
    const hasProjects = !!this.projects?.length;
    const hasResume = !!this.resumeFileUrl || !!this.studentProfile?.resumeUrl || !!this.studentProfile?.resume?.fileUrl;

    return hasFullName && hasSkills && hasEducation && hasProjects && hasResume;
  }

  getMissingFields(): string[] {
    const missing = [];
    if (!this.studentProfile) return ['Profile not loaded'];

    if (!this.studentProfile.fullName?.trim()) missing.push('Full Name');
    if (!this.skills?.trim()) missing.push('Skills');
    if (!this.education?.length) missing.push('Education');
    if (!this.projects?.length) missing.push('Projects');
    if (!this.resumeFileUrl && !this.studentProfile?.resumeUrl && !this.studentProfile?.resume?.fileUrl) missing.push('Resume');

    return missing;
  }

  // ================= APPLY =================
  apply() {

    if (!this.isProfileComplete()) {
      const missing = this.getMissingFields();
      const missingHtml = missing.map((field) => `- ${field}`).join('<br>');

      Swal.fire({
        icon: 'warning',
        title: 'Profile Incomplete',
        html: `Your student profile is not complete yet. Please review or update the missing fields before applying:<br><br>${missingHtml}`,
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonText: 'Review profile',
        denyButtonText: 'Complete missing fields',
        cancelButtonText: 'Cancel',
        focusCancel: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/student-dashboard/student-profile']);
        } else if (result.isDenied) {
          this.navigateToMissingField(missing);
        }
      });

      return;
    }

    // Show confirmation modal
    this.showModal = true;
  }

  navigateToMissingField(missing: string[]) {
    if (missing.includes('Education')) {
      this.router.navigate(['/student-dashboard/education-form']);
      return;
    }
    if (missing.includes('Skills')) {
      this.router.navigate(['/student-dashboard/skills-form']);
      return;
    }
    if (missing.includes('Projects')) {
      this.router.navigate(['/student-dashboard/projects-form']);
      return;
    }
    if (missing.includes('Resume')) {
      this.router.navigate(['/student-dashboard/resume-form']);
      return;
    }
    this.router.navigate(['/student-dashboard/student-profile']);
  }

  // ================= CONFIRM APPLY =================
  confirmApply() {
    this.showModal = false;

    const payload = {
      internshipId: this.internship.id,
      studentId: this.studentId,
      companyId: this.internship.companyId
    };

    this.http.post(`${this.API_URL}/apply`, payload).subscribe({

      next: () => {

        this.applied = true;

        Swal.fire({
          icon: 'success',
          title: 'Applied Successfully',
          text: 'Your application has been submitted',
          confirmButtonText: 'View Applications'
        }).then(() => {

          this.router.navigate(['/student-dashboard/my-applications']);

        });

      },

      error: (err) => {

        if (err?.error === 'Already applied') {

          this.applied = true;

          Swal.fire({
            icon: 'info',
            title: 'Already Applied',
            text: 'You already applied for this internship'
          }).then(() => {

            this.router.navigate(['/student-dashboard/my-applications']);

          });

        } else {

          console.error("Apply error:", err);

          Swal.fire(
            'Error',
            'Apply failed',
            'error'
          );

        }
      }

    });
  }

  // ================= CANCEL APPLY =================
  cancelApply() {
    this.showModal = false;
  }

  // ================= GET RESUME STATUS =================
  getResumeStatus(): string {
    const resumeExists = !!this.resumeFileUrl || !!this.studentProfile?.resumeUrl || !!this.studentProfile?.resume?.fileUrl;
    return resumeExists ? 'Uploaded' : 'Not Uploaded';
  }
}