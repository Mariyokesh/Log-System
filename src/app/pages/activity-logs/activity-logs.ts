import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockDataService } from '../../services/mock-data';
import { ADAction } from '../../services/mock-data';


@Component({
  selector: 'app-activity-logs',
  imports: [CommonModule, FormsModule],
  templateUrl: './activity-logs.html',
  styleUrl: './activity-logs.scss'
})
export class ActivityLogs {
  private mockDataService = inject(MockDataService);

 
  userFilter = signal('');
  moduleFilter = signal('');
  dateFilter = signal('');

  
  filteredLogs = computed(() => {
    const logs = this.mockDataService.logs();
    const user = this.userFilter().toLowerCase();
    const module = this.moduleFilter().toLowerCase();
    const date = this.dateFilter();

    return logs.filter(log => {
      const matchUser = !user || log.user.toLowerCase().includes(user);
      const matchModule = !module || log.module.toLowerCase().includes(module);
      
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
  });

formatAction(action: ADAction | string): string {
    return action
      .toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
}


