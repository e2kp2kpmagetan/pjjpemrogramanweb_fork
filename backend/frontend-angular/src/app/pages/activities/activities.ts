import { Component, OnInit, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-Activities',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './activities.html'
})
export class Activities implements OnInit {
  activities: any[] = [];
  customersList: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  newActivity: any = { customer_id: null, type: 'Call', description: '', activity_date: ''};
  editActivityData: any = { id: null, customer_id: null, type: '', description: '', activity_date: ''};
  
  isSaving: boolean = false;
  isUpdating: boolean = false;

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadActivities();
      this.loadCustomersList();
    } else {
      this.isLoading = false;
    }
  }

  loadCustomersList() {
    this.api.getCustomers().subscribe({
      next: (res) => {
        this.customersList = Array.isArray(res) ? res : (res.data || []);
        this.cdr.detectChanges();
      },
      error: (err) => console.error("Gagal memuat list customer", err)
    });
  }

  // Fungsi untuk mengekstrak ID dari Token JWT
  getCurrentUserId(): number {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // JWT terdiri dari 3 bagian dipisah titik. Bagian ke-2 adalah payload (data diri)
          const payload = JSON.parse(atob(token.split('.')[1]));
          return payload.id || payload.userId || 1; // Ambil ID, jika gagal fallback ke 1
        } catch (e) {
          console.error("Gagal membaca token", e);
        }
      }
    }
    return 1; // Fallback jika tidak login
  }

  loadActivities() {
    this.isLoading = true;
    this.api.getActivities().subscribe({
      next: (res) => {
        let rawData = Array.isArray(res) ? res : (res.data || []);
        this.activities = rawData.sort((a: any, b: any) => a.id - b.id);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = "Gagal memuat data Activities.";
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

 saveActivity() {
    if (!this.newActivity.type) { alert("Tipe Aktivitas wajib dipilih!"); return; }
    if (!this.newActivity.customer_id) { alert("ID Customer wajib diisi!"); return; }

    this.newActivity.customer_id = Number(this.newActivity.customer_id);
    
    // =========================================================
    // DI SINI TEMPATNYA! Kita suntikkan ID-nya sesaat sebelum disave
    this.newActivity.created_by = this.getCurrentUserId(); 
    // =========================================================

    this.isSaving = true;
    this.api.createActivity(this.newActivity).subscribe({
      next: () => {
        this.loadActivities();
        // Saat reset form, boleh dibiarkan kosong dulu atau pakai angka 1 sementara
        this.newActivity = { customer_id: null, type: 'Call', description: '', activity_date: '' };
        this.isSaving = false;
        this.closeModal('addActivityModal');
      },
      error: () => { alert("Gagal menyimpan data!"); this.isSaving = false; this.cdr.detectChanges(); }
    });
  }

  openEditModal(Activity: any) {
    this.editActivityData = { ...Activity };
    const modalElement = document.getElementById('editActivityModal');
    if (modalElement) new (window as any).bootstrap.Modal(modalElement).show();
  }

  saveEditActivity() {
    if (!this.editActivityData.type) { alert("Tipe wajib diisi!"); return; }
    if (!this.editActivityData.customer_id) { alert("Customer wajib dipilih!"); return; }

    const payload = {
      customer_id: Number(this.editActivityData.customer_id),
      type: this.editActivityData.type,
      description: this.editActivityData.description,
      activity_date: this.editActivityData.activity_date,
      created_by: Number(this.editActivityData.created_by || 1)
    };

    this.isUpdating = true;
    this.api.updateActivity(this.editActivityData.id, payload).subscribe({
      next: () => { this.loadActivities(); this.isUpdating = false; this.closeModal('editActivityModal'); },
      error: (err) => { console.error(err); this.isUpdating = false; this.cdr.detectChanges(); }
    });
  }

  deleteActivity(id: number, name: string) {
    if (confirm(`Hapus Activity "${name}"?`)) {
      this.api.deleteActivity(id).subscribe({
        next: () => this.loadActivities(),
        error: () => alert('Gagal menghapus data.')
      });
    }
  }

  // Helper penutup modal
  closeModal(modalId: string) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }
  }
}