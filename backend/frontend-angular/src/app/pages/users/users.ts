import { Component, OnInit, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-Users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html'
})
export class Users implements OnInit {
  users: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  newUser = { name: '', email: '', password: '', role: 'staff' };
  editUserData: any = { id: null, name: '', email: '', password: '', role: '' };
  
  isSaving: boolean = false;
  isUpdating: boolean = false;

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  userRole: string = '';
  ngOnInit() {
    this.userRole = this.api.getUserRole();
    if (isPlatformBrowser(this.platformId)) {
      this.loadUsers();
    } else {
      this.isLoading = false;
    }
  }

  loadUsers() {
    this.isLoading = true;
    this.api.getUsers().subscribe({
      next: (res) => {
        let rawData = Array.isArray(res) ? res : (res.data || []);
        this.users = rawData.sort((a: any, b: any) => a.id - b.id);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = "Gagal memuat data Users.";
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  saveUser() {
    if (!this.newUser.name || !this.newUser.email || !this.newUser.password) { 
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Nama, Email, dan Password wajib diisi!' });
      return; 
    }

    this.isSaving = true;
    this.api.createUser(this.newUser).subscribe({
      next: () => {
        this.loadUsers();
        this.isSaving = false;
        this.closeModal('addUserModal');
        
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Pengguna sistem baru telah didaftarkan.', timer: 1500, showConfirmButton: false });
        
        // Reset Form
        this.newUser = { name: '', email: '', password: '', role: 'staff' };
      },
      error: () => { 
        this.isSaving = false; this.cdr.detectChanges(); 
        Swal.fire('Gagal', 'Gagal menyimpan user. Mungkin email sudah terdaftar.', 'error'); 
      }
    });
  }

  openEditModal(User: any) {
    this.editUserData = { ...User };
    const modalElement = document.getElementById('editUserModal');
    if (modalElement) new (window as any).bootstrap.Modal(modalElement).show();
  }

  saveEditUser() {
    if (!this.editUserData.name || !this.editUserData.email) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Nama dan Email tidak boleh kosong!' });
      return;
    }

    // Konstruksi Payload (Password hanya dikirim jika diisi ulang)
    const payload: any = {
      id: this.editUserData.id,
      name: this.editUserData.name,
      email: this.editUserData.email,
      role: this.editUserData.role
    };
    if (this.editUserData.password) {
      payload.password = this.editUserData.password;
    }

    this.isUpdating = true;
    this.api.updateUser(this.editUserData.id, payload).subscribe({
      next: () => {
        this.loadUsers();
        this.isUpdating = false;
        this.closeModal('editUserModal');
        Swal.fire({ icon: 'success', title: 'Diperbarui!', text: 'Hak akses / profil pengguna berhasil diubah.', timer: 1500, showConfirmButton: false });
      },
      error: () => { 
        this.isUpdating = false; this.cdr.detectChanges(); 
        Swal.fire('Gagal', 'Gagal memperbarui data pengguna.', 'error'); 
      }
    });
  }

  deleteUser(id: number, name: string) {
    Swal.fire({
      title: 'Cabut Hak Akses?',
      text: `User "${name}" tidak akan bisa login lagi ke dalam sistem!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus User!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deleteUser(id).subscribe({
          next: () => { 
            this.loadUsers(); 
            Swal.fire('Terhapus!', 'Pengguna telah dihapus dari database.', 'success'); 
          },
          error: () => Swal.fire('Gagal!', 'Gagal menghapus pengguna.', 'error')
        });
      }
    });
  }

  closeModal(modalId: string) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }
  }
}