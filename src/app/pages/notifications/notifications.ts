import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService, Notification } from '../../services/mock-data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-notifications',
  imports: [CommonModule],
  templateUrl: './notifications.html',
  styleUrl: './notifications.scss'
})
export class Notifications implements OnInit {
  notifications$: Observable<Notification[]>;
  unreadNotifications$: Observable<Notification[]>;
  readNotifications$: Observable<Notification[]>;
  activeTab: string = 'unread';

  constructor(private mockDataService: MockDataService) {
    this.notifications$ = this.mockDataService.getNotifications();
    this.unreadNotifications$ = this.notifications$.pipe(
      map(notifications => notifications.filter(n => !n.isRead))
    );
    this.readNotifications$ = this.notifications$.pipe(
      map(notifications => notifications.filter(n => n.isRead))
    );
  }

  ngOnInit(): void {}

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  toggleNotification(id: number) {
    this.mockDataService.toggleNotification(id);
  }

  markAll(flag: boolean) {
    this.mockDataService.markAll(flag);
  }
}
