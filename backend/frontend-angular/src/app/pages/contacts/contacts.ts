import { Component, OnInit, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacts.html'
})
export class Contacts implements OnInit {
  contacts: any[] = [];
  customersList: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  newContact = { customer_id: null, name: '', email: '', phone: '', position: '' };
  editContactData: any = { id: null, customer_id: null, name: '', email: '', phone: '', position: '' };
  
  isSaving: boolean = false;
  isUpdating: boolean = false;

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadContacts();
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

  loadContacts() {
    this.isLoading = true;
    this.api.getContacts().subscribe({
      next: (res) => {
        let rawData = Array.isArray(res) ? res : (res.data || []);
        this.contacts = rawData.sort((a: any, b: any) => a.id - b.id);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = "Gagal memuat data contacts.";
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  saveContact() {
    if (!this.newContact.name) { alert("Nama wajib diisi!"); return; }
    this.isSaving = true;
    this.api.createContact(this.newContact).subscribe({
      next: () => {
        this.loadContacts();
        this.newContact = { customer_id: null, name: '', email: '', phone: '', position: '' };
        this.isSaving = false;
        this.closeModal('addContactModal');
      },
      error: () => { alert("Gagal menyimpan data!"); this.isSaving = false; this.cdr.detectChanges(); }
    });
  }

  openEditModal(contact: any) {
    this.editContactData = { ...contact };
    const modalElement = document.getElementById('editContactModal');
    if (modalElement) new (window as any).bootstrap.Modal(modalElement).show();
  }

  saveEditContact() {
    if (!this.editContactData.name) { alert("Nama Kontak wajib diisi!"); return; }
    if (!this.editContactData.customer_id) { alert("Customer wajib dipilih!"); return; }

    // SOLUSI: Bersihkan payload, hanya kirim kolom asli tabel contacts
    const payload = {
      id: this.editContactData.id,
      customer_id: Number(this.editContactData.customer_id),
      name: this.editContactData.name,
      email: this.editContactData.email,
      phone: this.editContactData.phone,
      position: this.editContactData.position
    };

    this.isUpdating = true;
    this.api.updateContact(this.editContactData.id, payload).subscribe({
      next: () => {
        this.loadContacts();
        this.isUpdating = false;
        this.closeModal('editContactModal');
      },
      error: (err) => {
        console.error(err);
        alert("Gagal mengubah data kontak!");
        this.isUpdating = false;
        this.cdr.detectChanges();
      }
    });
  }

  deleteContact(id: number, name: string) {
    if (confirm(`Hapus kontak "${name}"?`)) {
      this.api.deleteContact(id).subscribe({
        next: () => this.loadContacts(),
        error: () => alert('Gagal menghapus data.')
      });
    }
  }

  closeModal(modalId: string) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }
  }
}