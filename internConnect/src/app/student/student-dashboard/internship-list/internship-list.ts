import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-internship-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './internship-list.html',
  styleUrls: ['./internship-list.css'],
})
export class InternshipList implements OnInit {

  API_URL = 'http://internconnect-5n7j.onrender.com/api/company/internship';

  allInternships: any[] = [];
  filteredInternships: any[] = [];
  loading = true;

  keyword = '';
  departmentFilter = '';
  locationFilter = '';
  workFromHome = false;
  partTime = false;
  stipendFilter = 0;
  startDate = '';
  durationFilter = '';
  withCertificate = false;
  withPPO = false;
  showMoreFilters = false;
  forWomenOnly = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // ================= LOAD DATA =================
  ngOnInit(): void {

    this.http.get<any[]>(`${this.API_URL}/public`).subscribe({

      next: (res) => {
        this.allInternships = res || [];
        this.filteredInternships = res || [];
        this.loading = false;
      },

      error: (err) => {
        console.error('Error loading internships', err);
        this.allInternships = [];
        this.filteredInternships = [];
        this.loading = false;
      }

    });
  }


  // ================= FILTERS =================
  toggleFilters() {
    this.showMoreFilters = !this.showMoreFilters;
  }

  setStipend(value: number) {
    this.stipendFilter = value;
    this.applyFilters();
  }

  applyFilters() {

    this.filteredInternships = this.allInternships.filter(i => {

      // Keyword
      const title = i?.internshipTitle || i?.title || i?.profile || '';
      const location = i?.companyLocation || i?.location || '';
      const internshipType = i?.internshipType || i?.type || '';
      const duration = i?.duration ?? i?.durationMonths ?? 0;
      const hasPPO = i?.ppo || i?.jobOffer || false;

      if (
        this.keyword &&
        !title.toLowerCase().includes(this.keyword.toLowerCase()) &&
        !i?.companyName?.toLowerCase().includes(this.keyword.toLowerCase())
      ) return false;

      if (
        this.locationFilter &&
        !location.toLowerCase().includes(this.locationFilter.toLowerCase())
      ) return false;

      if (
        this.workFromHome &&
        internshipType.toUpperCase() !== 'REMOTE'
      ) return false;

      if (
        this.partTime &&
        internshipType.toUpperCase() !== 'PART_TIME'
      ) return false;

      if (
        this.stipendFilter &&
        (i?.stipend ?? 0) < this.stipendFilter
      ) return false;

      if (
        this.durationFilter &&
        duration > +this.durationFilter
      ) return false;

      if (this.withPPO && !hasPPO) return false;

      if (this.forWomenOnly && !i?.forWomen) return false;


      return true;
    });
  }


  // ================= NAVIGATION =================
  viewDetail(id: number) {
    this.router.navigate(['/internship-details', id]);
  }


  // ================= LOGO INITIAL =================
  getCompanyInitials(text: string | null | undefined): string {

    if (!text || text.trim().length === 0) {
      return '?';
    }

    const words = text.trim().split(/\s+/);

    return words.length === 1
      ? words[0][0].toUpperCase()
      : (words[0][0] + words[1][0]).toUpperCase();
  }


  // ================= LOGO COLOR =================
  getLogoColor(text: string | null | undefined): string {

    const colors = [
      '#4A90E2',
      '#50E3C2',
      '#F5A623',
      '#E94E77',
      '#7B61FF',
      '#2ECC71'
    ];

    // Safety check
    if (!text || text.length === 0) {
      return '#cccccc'; // default grey
    }

    return colors[text.charCodeAt(0) % colors.length];
  }

}
