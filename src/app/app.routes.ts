import { Routes } from '@angular/router';
import { Notifications } from './pages/notifications/notifications';
import { ActivityLogs } from './pages/activity-logs/activity-logs';

export const routes: Routes = [
  { path: 'notifications', component: Notifications },
  { path: 'activity-logs', component: ActivityLogs },
  { path: '', redirectTo: 'notifications', pathMatch: 'full' }
];
