import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-staff-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Dashboard</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400 uppercase font-bold">New Bookings</p>
              <h3 class="text-3xl font-bold text-gray-900 dark:text-white mt-2">12</h3>
            </div>
            <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-500">
              <i class="fas fa-calendar-check text-xl"></i>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-l-4 border-green-500">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400 uppercase font-bold">Checked In</p>
              <h3 class="text-3xl font-bold text-gray-900 dark:text-white mt-2">45</h3>
            </div>
            <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-500">
              <i class="fas fa-door-open text-xl"></i>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
          <div class="flex justify-between items-start">
             <div>
              <p class="text-sm text-gray-500 dark:text-gray-400 uppercase font-bold">Pending Requests</p>
              <h3 class="text-3xl font-bold text-gray-900 dark:text-white mt-2">5</h3>
            </div>
            <div class="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-yellow-500">
              <i class="fas fa-bell text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <h3 class="font-bold text-gray-900 dark:text-white">Today's Schedule</h3>
            <span class="text-sm text-gray-500 dark:text-gray-400">Oct 24, 2026</span>
        </div>
        <div class="divide-y divide-gray-100 dark:divide-gray-700">
            @for (task of schedule; track task.id) {
                <div class="p-6 flex items-start">
                    <div class="flex-shrink-0 w-12 text-center">
                        <span class="block font-bold text-gray-900 dark:text-white">{{ task.time }}</span>
                        <span class="text-xs text-gray-500 dark:text-gray-400">{{ task.ampm }}</span>
                    </div>
                    <div class="ml-6 flex-1">
                        <div class="flex justify-between">
                            <h4 class="font-bold text-gray-900 dark:text-white">{{ task.title }}</h4>
                            <span [ngClass]="{
                                'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300': task.priority === 'High',
                                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300': task.priority === 'Medium',
                                'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300': task.priority === 'Low'
                            }" class="px-2 py-0.5 rounded text-xs font-medium">{{ task.priority }}</span>
                        </div>
                        <p class="text-gray-600 dark:text-gray-300 text-sm mt-1">{{ task.description }}</p>
                    </div>
                </div>
            }
        </div>
      </div>
    </div>
  `
})
export class StaffDashboard {
  schedule = [
    { id: 1, time: '09:00', ampm: 'AM', title: 'Room Inspection', description: 'Inspect Room 302, 304, 305 for checkout.', priority: 'High' },
    { id: 2, time: '11:30', ampm: 'AM', title: 'Guest Arrival', description: 'Prepare welcome kit for VIP guest Mr. Shah.', priority: 'Medium' },
    { id: 3, time: '02:00', ampm: 'PM', title: 'Staff Meeting', description: 'Weekly housekeeping coordination meeting.', priority: 'Low' },
    { id: 4, time: '04:15', ampm: 'PM', title: 'Maintenance Request', description: 'Report AC issue in Room 102 to maintenance.', priority: 'High' }
  ];
}
