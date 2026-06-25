import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api'; // Sesuaikan port backend Anda

  constructor(private http: HttpClient) { }

  // Fungsi Login
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password });
  }

  // Fungsi cek status login untuk menyembunyikan sidebar (Aman dari SSR)
  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      return !!localStorage.getItem('token'); 
    }
    return false;
  }

  // ==========================================
  // CUSTOMERS
  // ==========================================
  getCustomers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/customers`);
  }
  createCustomer(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/customers`, data);
  }
  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/customers/${id}`);
  }
  updateCustomer(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/customers/${id}`, data);
  }

  // ==========================================
  // LEADS
  // ==========================================
  getLeads(): Observable<any> { return this.http.get(`${this.apiUrl}/leads`); }
  createLead(data: any): Observable<any> { return this.http.post(`${this.apiUrl}/leads`, data); }
  updateLead(id: number, data: any): Observable<any> { return this.http.put(`${this.apiUrl}/leads/${id}`, data); }
  deleteLead(id: number): Observable<any> { return this.http.delete(`${this.apiUrl}/leads/${id}`); }

  // ==========================================
  // CONTACTS
  // ==========================================
  getContacts(): Observable<any> { return this.http.get(`${this.apiUrl}/contacts`); }
  createContact(data: any): Observable<any> { return this.http.post(`${this.apiUrl}/contacts`, data); }
  updateContact(id: number, data: any): Observable<any> { return this.http.put(`${this.apiUrl}/contacts/${id}`, data); }
  deleteContact(id: number): Observable<any> { return this.http.delete(`${this.apiUrl}/contacts/${id}`); }

  // ==========================================
  // DEALS
  // ==========================================
  getDeals(): Observable<any> { return this.http.get(`${this.apiUrl}/deals`); }
  createDeal(data: any): Observable<any> { return this.http.post(`${this.apiUrl}/deals`, data); }
  updateDeal(id: number, data: any): Observable<any> { return this.http.put(`${this.apiUrl}/deals/${id}`, data); }
  deleteDeal(id: number): Observable<any> { return this.http.delete(`${this.apiUrl}/deals/${id}`); }

  // ==========================================
  // ACTIVITIES
  // ==========================================
  getActivities(): Observable<any> { return this.http.get(`${this.apiUrl}/activities`); }
  createActivity(data: any): Observable<any> { return this.http.post(`${this.apiUrl}/activities`, data); }
  updateActivity(id: number, data: any): Observable<any> { return this.http.put(`${this.apiUrl}/activities/${id}`, data); }
  deleteActivity(id: number): Observable<any> { return this.http.delete(`${this.apiUrl}/activities/${id}`); }

  // ==========================================
  // USERS
  // ==========================================
  getUsers(): Observable<any> { return this.http.get(`${this.apiUrl}/users`); }
  createUser(data: any): Observable<any> { return this.http.post(`${this.apiUrl}/users`, data); }
  updateUser(id: number, data: any): Observable<any> { return this.http.put(`${this.apiUrl}/users/${id}`, data); }
  deleteUser(id: number): Observable<any> { return this.http.delete(`${this.apiUrl}/users/${id}`); }
  
  // Fungsi untuk mengambil Role dari Token
  getUserRole(): string {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          return payload.role || 'staff'; // Ambil role, jika kosong anggap saja staff
        } catch (e) {
          return 'staff';
        }
      }
    }
    return 'staff';
  }

  // Fungsi untuk mengambil Nama dari Token
  getUserName(): string {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          // 1. PASANG JEBAKAN DI CONSOLE UNTUK INTIP ISI TOKEN ASLI
          console.log("=== ISI PAYLOAD TOKEN BACKEND ANDA ===", payload);
          
          // 2. SISTEM CADANGAN OTOMATIS: 
          // Cek payload.name, kalau kosong cek payload.username, kalau kosong cek payload.nama, dst.
          return payload.name || payload.username || payload.nama || payload.email || 'Pengguna';
        } catch (e) {
          return 'Pengguna';
        }
      }
    }
    return 'Pengguna';
  }

  // Fungsi Logout (Aman dari SSR)
  logout() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
    }
  }
}