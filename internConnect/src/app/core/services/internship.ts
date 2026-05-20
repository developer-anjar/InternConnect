import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InternshipService {

  private baseUrl = 'http://internconnect-5n7j.onrender.com/api/internships';

  constructor(private http: HttpClient) {}

  addInternship(formData: FormData) {
    return this.http.post(this.baseUrl, formData);
  }

  getInternships() {
    return this.http.get(this.baseUrl);
  }

  getInternshipById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  applyForInternship(id: number, body: any) {
    return this.http.post(`${this.baseUrl}/${id}/apply`, body);
  }
}
