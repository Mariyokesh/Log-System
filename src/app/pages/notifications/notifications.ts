import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../services/mock-data';

@Component({
  selector: 'app-notifications',
  imports: [CommonModule],
  templateUrl: './notifications.html',
  styleUrl: './notifications.scss'
})
export class Notifications {
  private mockDataService = inject(MockDataService);
  
  activeTab = signal<'unread' | 'read'>('unread');

  unreadNotifications = computed(() => 
    this.mockDataService.notifications().filter(n => !n.isRead)
  );

  readNotifications = computed(() => 
    this.mockDataService.notifications().filter(n => n.isRead)
  );

  setActiveTab(tab: 'unread' | 'read') {
    this.activeTab.set(tab);
  }

  toggleNotification(id: number) {
    this.mockDataService.toggleNotification(id);
  }

  markAll(flag: boolean) {
    this.mockDataService.markAll(flag);
  }
}
