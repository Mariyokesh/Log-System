import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockDataService, ActivityLog } from '../../services/mock-data';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-activity-logs',
  imports: [CommonModule, FormsModule],
  templateUrl: './activity-logs.html',
  styleUrl: './activity-logs.scss'
})
export class ActivityLogs implements OnInit {
  logs$: Observable<ActivityLog[]>;
  filteredLogs$: Observable<ActivityLog[]>;

  // Filters
  filterUser = new BehaviorSubject<string>('');
  filterModule = new BehaviorSubject<string>('');
  filterDate = new BehaviorSubject<string>('');

  // Values for binding
  userFilterValue = '';
  moduleFilterValue = '';
  dateFilterValue = '';

  constructor(private mockDataService: MockDataService) {
    this.logs$ = this.mockDataService.getActivityLogs();

    this.filteredLogs$ = combineLatest([
      this.logs$,
      this.filterUser,
      this.filterModule,
      this.filterDate
    ]).pipe(
      map(([logs, user, module, date]) => {
        return logs.filter(log => {
          const matchUser = !user || log.user.toLowerCase().includes(user.toLowerCase());
          const matchModule = !module || log.module.toLowerCase().includes(module.toLowerCase());
          
          let matchDate = true;
          if (date) {
            const logDate = new Date(log.timestamp);
            const logDateStr = logDate.getFullYear() + '-' + 
               ('0' + (logDate.getMonth() + 1)).slice(-2) + '-' + 
               ('0' + logDate.getDate()).slice(-2);
            matchDate = logDateStr === date;
          }
          
          return matchUser && matchModule && matchDate;
        });
      })
    );
  }

  ngOnInit(): void {}

  onUserFilterChange(value: string) {
    this.filterUser.next(value);
  }

  onModuleFilterChange(value: string) {
    this.filterModule.next(value);
  }

  onDateFilterChange(value: string) {
    this.filterDate.next(value);
  }
}
