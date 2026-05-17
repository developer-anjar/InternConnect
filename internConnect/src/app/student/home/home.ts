import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink,RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
   showSearch = false;

  constructor(private router: Router) {}

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  goToPostPage() {
    this.router.navigate(["/explore"]);
  }

  onImageError(event: any) {
    console.error('Image failed to load. Check if Poster-img.png exists in src/assets/');
    event.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-size="18" font-family="Arial"%3EImage not found%3C/text%3E%3C/svg%3E';
  }
}