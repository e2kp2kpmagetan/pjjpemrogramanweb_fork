import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html'
})
export class Login {
  // 1. Tambahkan wadah loginData
  loginData = { email: '', password: '' };
  isLoading = false;

  constructor(private api: ApiService, private router: Router) {}

  onLogin() {
    if (!this.loginData.email || !this.loginData.password) {
      Swal.fire({ icon: 'warning', title: 'Oops', text: 'Email dan password wajib diisi!' });
      return;
    }

    this.isLoading = true;
    
    // 2. Kirim email dan password secara terpisah sesuai permintaan API
    this.api.login(this.loginData.email, this.loginData.password).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        
        // Simpan token ke localStorage browser
        localStorage.setItem('token', res.token || res.data?.token);

        // Munculkan notifikasi sukses
        Swal.fire({
          icon: 'success',
          title: 'Login Berhasil!',
          text: `Selamat datang kembali!`,
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          // Lempar pengguna ke dashboard otomatis!
          this.router.navigate(['/dashboard']); 
        });
      },
      error: (err) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Login Gagal',
          text: err.error?.message || 'Email atau password salah!'
        });
      }
    });
  }

  // Fungsi untuk memunculkan pop-up Lupa Password
  showForgotPasswordAlert(event: Event) {
    event.preventDefault(); // Mencegah halaman refresh/pindah
    
    Swal.fire({
      icon: 'info',
      title: 'Lupa Password?',
      text: 'Silakan hubungi Administrator anda untuk melakukan reset password anda.',
      confirmButtonText: 'Mengerti',
      confirmButtonColor: '#0d6efd' // Warna biru khas Bootstrap
    });
  }
}