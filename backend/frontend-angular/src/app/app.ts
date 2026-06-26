import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import Swal from 'sweetalert2';

// 1. IMPORT API SERVICE KITA
import { ApiService } from './services/api'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html' 
})
export class App implements OnInit {
  isAuthPage: boolean = true; 
  
  // 2. VARIABEL USER
  userRole: string = ''; 
  userName: string = '';
  
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  
  // 3. INJECT API SERVICE
  private api = inject(ApiService); 

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      
      // Ambil role pertama kali saat web dibuka
      this.userRole = this.api.getUserRole();

      // 2. Tarik nama saat pertama kali load
      this.userName = this.api.getUserName();

      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: any) => {
        this.isAuthPage = event.url.includes('/auth/login') || event.url === '/';
        
        // Cek ulang Role setiap kali pindah halaman (Penting saat baru sukses Login)
        if (!this.isAuthPage) {
          this.userRole = this.api.getUserRole();
          // 3. Tarik ulang nama tiap pindah halaman
          this.userName = this.api.getUserName();
        }
      });
    }
  }

  viewProfile() {
    Swal.fire({
      title: 'Profil Pengguna',
      html: `
        <div class="text-start mt-3">
          <p><strong>Nama:</strong> ${this.userName}</p>
          <p><strong>Role:</strong> <span class="badge bg-primary text-uppercase">${this.userRole}</span></p>
          <p><strong>Status:</strong> <span class="text-success fw-bold">Aktif</span></p>
        </div>
      `,
      icon: 'info', 
      confirmButtonText: 'Tutup',
      confirmButtonColor: '#003366'
    });
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token'); // Hapus token
      this.userRole = ''; // Kosongkan role saat logout

      // Gunakan Vanilla JS window.location.href untuk HARD RELOAD.
      window.location.href = '/auth/login'; 
    }
  }

  toggleSidebar(event: Event) {
    event.preventDefault(); // Mencegah halaman refresh
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('sb-sidenav-toggled');
    }
  }
}