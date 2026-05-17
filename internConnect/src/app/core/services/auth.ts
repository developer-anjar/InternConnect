import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  // ---------- LOGIN ----------
  login(token: string, role: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
  }

  logout() {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // ---------- ROLE ----------
  setRole(role: string) {
    localStorage.setItem('role', role);
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // ---------- STUDENT ----------
  setStudentId(id: number) {
    localStorage.setItem('studentId', id.toString());
  }

  getStudentId(): string | null {
    return localStorage.getItem('studentId');
  }

  setStudentName(name: string) {
    localStorage.setItem('studentName', name);
  }

  getStudentName(): string | null {
    return localStorage.getItem('studentName');
  }

  // ---------- COMPANY ----------
  setCompanyId(id: number) {
    localStorage.setItem('companyId', id.toString());
  }

  getCompanyId(): string | null {
    return localStorage.getItem('companyId');
  }
}