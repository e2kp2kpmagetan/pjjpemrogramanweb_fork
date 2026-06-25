import { Component, OnInit, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-Deals',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './deals.html'
})
export class Deals implements OnInit {
  deals: any[] = [];
  leadsList: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  newDeal = { lead_id: null, title: '', value: null, stage: 'Proposal', closed_at: '' };
  editDealData: any = { id: null, lead_id: null, title: '', value: null, stage: '', closed_at: '' };
  
  isSaving: boolean = false;
  isUpdating: boolean = false;

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadDeals();
      this.loadLeadsList(); 
    } else {
      this.isLoading = false;
    }
  }

  loadLeadsList() {
    this.api.getLeads().subscribe({
      next: (res) => {
        this.leadsList = Array.isArray(res) ? res : (res.data || []);
        this.cdr.detectChanges();
      },
      error: (err) => console.error("Gagal memuat list leads", err)
    });
  }

  loadDeals() {
    this.isLoading = true;
    this.api.getDeals().subscribe({
      next: (res) => {
        let rawData = Array.isArray(res) ? res : (res.data || []);
        this.deals = rawData.sort((a: any, b: any) => a.id - b.id);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = "Gagal memuat data Deals.";
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  saveDeal() {
    if (!this.newDeal.title) { alert("Judul Deal wajib diisi!"); return; }
    if (!this.newDeal.lead_id) { alert("Lead wajib dipilih!"); return; }

    // 1. Bersihkan Payload sebelum dikirim ke Backend
    const payload = {
      lead_id: Number(this.newDeal.lead_id),
      title: this.newDeal.title,
      value: this.newDeal.value ? Number(this.newDeal.value) : null,
      stage: this.newDeal.stage,
      closed_at: this.newDeal.closed_at || null // Kirim null jika tanggal kosong
    };
    
    this.isSaving = true;
    this.api.createDeal(payload).subscribe({
      next: () => {
        this.loadDeals();
        this.newDeal = { lead_id: null, title: '', value: null, stage: 'Proposal', closed_at: '' };
        this.isSaving = false;
        this.closeModal('addDealModal');
      },
      error: (err) => { 
        console.error("Error Tambah Deal:", err); 
        alert("Gagal menyimpan data Deal!"); 
        this.isSaving = false; 
        this.cdr.detectChanges(); 
      }
    });
  }

  openEditModal(Deal: any) {
    this.editDealData = { ...Deal };
    const modalElement = document.getElementById('editDealModal');
    if (modalElement) new (window as any).bootstrap.Modal(modalElement).show();
  }

  saveEditDeal() {
    if (!this.editDealData.title) { alert("Judul Deal wajib diisi!"); return; }
    if (!this.editDealData.lead_id) { alert("Lead wajib dipilih!"); return; }

    const payload = {
      lead_id: Number(this.editDealData.lead_id),
      title: this.editDealData.title,
      value: this.editDealData.value ? Number(this.editDealData.value) : null,
      stage: this.editDealData.stage,
      closed_at: this.editDealData.closed_at
    };

    this.isUpdating = true;
    this.api.updateDeal(this.editDealData.id, payload).subscribe({
      next: () => { this.loadDeals(); this.isUpdating = false; this.closeModal('editDealModal'); },
      error: (err) => { console.error(err); this.isUpdating = false; this.cdr.detectChanges(); }
    });
  }

  deleteDeal(id: number, name: string) {
    if (confirm(`Hapus Deal "${name}"?`)) {
      this.api.deleteDeal(id).subscribe({
        next: () => this.loadDeals(),
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