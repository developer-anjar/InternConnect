import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {

  getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
}

  isScrolled = false;

  studentName: string = '';

  // Placeholder animation variables
  animatedPlaceholder = "Search internships...";

  placeholders = [
    "Search internships...",
    "Search companies...",
    "Search locations...",
    "Search skills...",
    "Find opportunities..."
  ];

  constructor(private auth: Auth, private router: Router) {}

  ngOnInit() {

  const studentName = this.auth.getStudentName();

  if (studentName) {
    this.studentName = studentName;
  }

}


  // 🔹 Check login
  isLoggedIn(): boolean {
    return !!this.auth.getToken();
  }
  isStudent(): boolean {
  return !!this.auth.getStudentId();
}

isCompany(): boolean {
  return !!this.auth.getCompanyId();
}


  // 🔹 Logout
  logout() {

    this.auth.logout();

    this.router.navigate(['/login']);

  }


  // 🔹 Search
  onSearch(event: any) {

    const query = event.target.value;

    console.log("Searching for:", query);

  }


  // 🔹 Scroll effect
  @HostListener('window:scroll')
  onScroll() {

    this.isScrolled = window.scrollY > 20;

  }

}