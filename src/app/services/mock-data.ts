import { Injectable, signal } from '@angular/core';

export interface Notification {
  id: number;
  message: string;
  timestamp: Date;
  isRead: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface ActivityLog {
  id: number;
  action: string;
  user: string;
  module: string;
  timestamp: Date;
  details?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private _notifications = signal<Notification[]>([
    { id: 1, message: 'Welcome to the system', timestamp: new Date(), isRead: false, type: 'info' },
    { id: 2, message: 'Server update completed', timestamp: new Date(Date.now() - 3600000), isRead: true, type: 'success' },
    { id: 3, message: 'High CPU usage detected', timestamp: new Date(Date.now() - 7200000), isRead: false, type: 'warning' },
    { id: 4, message: 'Backup failed', timestamp: new Date(Date.now() - 86400000), isRead: false, type: 'error' }
  ]);
  
  private _logs = signal<ActivityLog[]>([
    { id: 1, action: 'Login', user: 'admin', module: 'Auth', timestamp: new Date() },
    { id: 2, action: 'Create User', user: 'admin', module: 'User Management', timestamp: new Date(Date.now() - 1000000) },
    { id: 3, action: 'Logout', user: 'guest', module: 'Auth', timestamp: new Date(Date.now() - 5000000) },
    { id: 4, action: 'View Report', user: 'manager', module: 'Reports', timestamp: new Date(Date.now() - 7200000) },
    { id: 5, action: 'Update Settings', user: 'admin', module: 'Settings', timestamp: new Date(Date.now() - 10000000) }
  ]);

  readonly notifications = this._notifications.asReadonly();
  readonly logs = this._logs.asReadonly();

  constructor() {
    
    setInterval(() => {
      this.simulateNewNotification();
    }, 30000); 

    setInterval(() => {
      this.simulateNewLog();
    }, 15000); 
  }

  toggleNotification(id: number) {
    this._notifications.update(notifications => 
      notifications.map(n => 
        n.id === id ? { ...n, isRead: !n.isRead } : n
      )
    );
  }

  markAll(flag: boolean) {
    this._notifications.update(notifications => 
      notifications.map(n => ({ ...n, isRead: flag }))
    );
  }

  private simulateNewNotification() {
    this._notifications.update(notifications => {
      const id = notifications.length > 0 ? Math.max(...notifications.map(n => n.id)) + 1 : 1;
      const types: ('info' | 'success' | 'warning' | 'error')[] = ['info', 'success', 'warning', 'error'];
      const type = types[Math.floor(Math.random() * types.length)];
      const newNotif: Notification = {
        id,
        message: `New system event #${id}`,
        timestamp: new Date(),
        isRead: false,
        type
      };
      return [newNotif, ...notifications];
    });
  }

  private simulateNewLog() {
    this._logs.update(logs => {
      const id = logs.length > 0 ? Math.max(...logs.map(l => l.id)) + 1 : 1;
      const actions = ['Login', 'Logout', 'Update Profile', 'Delete Item', 'View Report'];
      const modules = ['Auth', 'User Management', 'Reports', 'Settings'];
      const users = ['admin', 'manager', 'user1', 'guest'];
  
      const newLog: ActivityLog = {
        id,
        action: actions[Math.floor(Math.random() * actions.length)],
        user: users[Math.floor(Math.random() * users.length)],
        module: modules[Math.floor(Math.random() * modules.length)],
        timestamp: new Date()
      };
      return [newLog, ...logs];
    });
  }
}
