import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit {
  totalCustomers: number = 0;
  totalLeads: number = 0;
  totalDeals: number = 0;
  totalActivities: number = 0;
  isLoading: boolean = true;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    // Tarik data customers
    this.api.getCustomers().subscribe((res: any) => {
      const data = Array.isArray(res) ? res : (res.data || []);
      this.totalCustomers = data.length;
      this.cdr.detectChanges();
    });

    // Tarik data leads
    this.api.getLeads().subscribe((res: any) => {
      const data = Array.isArray(res) ? res : (res.data || []);
      this.totalLeads = data.length;
      this.cdr.detectChanges();
    });

    // Tarik data deals
    this.api.getDeals().subscribe((res: any) => {
      const data = Array.isArray(res) ? res : (res.data || []);
      this.totalDeals = data.length;
      this.cdr.detectChanges();
    });

    // Tarik data activities
    this.api.getActivities().subscribe((res: any) => {
      const data = Array.isArray(res) ? res : (res.data || []);
      this.totalActivities = data.length;
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }
}