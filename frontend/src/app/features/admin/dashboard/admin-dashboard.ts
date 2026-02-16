import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';

@Component({
  selector: 'app-admin-dashboard',
  imports: [DecimalPipe, BaseChartDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">System Overview</h1>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400 uppercase font-bold">Total Revenue</p>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-2">₹{{ 1042000 | number:'1.0-0' }}</h3>
            </div>
            <div class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-500">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"/></svg>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400 uppercase font-bold">Total Bookings</p>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-2">1,245</h3>
            </div>
            <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-500">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/></svg>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-l-4 border-green-500">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400 uppercase font-bold">Active Guests</p>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-2">85</h3>
            </div>
            <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-500">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/></svg>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-l-4 border-orange-500">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400 uppercase font-bold">Staff Members</p>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-2">24</h3>
            </div>
            <div class="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-orange-500">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/></svg>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Occupancy Statistics Chart -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden p-6">
          <h3 class="font-bold text-gray-900 dark:text-white mb-4">Occupancy Statistics</h3>
          <div class="h-64">
            <canvas baseChart
              [data]="barChartData"
              [options]="barChartOptions"
              [type]="'bar'">
            </canvas>
          </div>
        </div>

        <!-- Revenue Pie Chart -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden p-6">
          <h3 class="font-bold text-gray-900 dark:text-white mb-4">Revenue by Room Type</h3>
          <div class="h-64 flex items-center justify-center">
            <canvas baseChart
              [data]="pieChartData"
              [options]="pieChartOptions"
              [type]="'doughnut'">
            </canvas>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden lg:col-span-2">
             <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                <h3 class="font-bold text-gray-900 dark:text-white">Recent System Activity</h3>
            </div>
            <div class="divide-y divide-gray-100 dark:divide-gray-700">
                <div class="p-4 flex items-center">
                    <div class="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <p class="text-sm text-gray-600 dark:text-gray-300"><span class="font-bold text-gray-900 dark:text-white">Ravi Patel</span> checked in to Room 302.</p>
                    <span class="ml-auto text-xs text-gray-400">10 mins ago</span>
                </div>
                 <div class="p-4 flex items-center">
                    <div class="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <p class="text-sm text-gray-600 dark:text-gray-300"><span class="font-bold text-gray-900 dark:text-white">New Booking</span> received from Website.</p>
                    <span class="ml-auto text-xs text-gray-400">25 mins ago</span>
                </div>
                 <div class="p-4 flex items-center">
                    <div class="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    <p class="text-sm text-gray-600 dark:text-gray-300"><span class="font-bold text-gray-900 dark:text-white">Staff Update</span>: Priya Sharma added to Housekeeping.</p>
                    <span class="ml-auto text-xs text-gray-400">1 hour ago</span>
                </div>
                <div class="p-4 flex items-center">
                    <div class="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    <p class="text-sm text-gray-600 dark:text-gray-300"><span class="font-bold text-gray-900 dark:text-white">Payment</span> of ₹99,600 received.</p>
                    <span class="ml-auto text-xs text-gray-400">2 hours ago</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  `
})
export class AdminDashboard {
  // Bar Chart - Occupancy Statistics
  barChartData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Occupancy Rate %',
        data: [65, 78, 82, 75, 88, 92, 85],
        backgroundColor: 'rgba(212, 175, 55, 0.8)',
        borderColor: 'rgba(212, 175, 55, 1)',
        borderWidth: 1,
        borderRadius: 8,
      },
      {
        label: 'Bookings',
        data: [120, 145, 160, 140, 175, 190, 168],
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
        borderRadius: 8,
      }
    ]
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  // Pie Chart - Revenue by Room Type (in INR, represented in lakhs for display)
  pieChartData: ChartData<'doughnut'> = {
    labels: ['Deluxe', 'Executive', 'Presidential', 'Standard', 'Family', 'Penthouse'],
    datasets: [{
      data: [208000, 291000, 374000, 125000, 232000, 266000],
      backgroundColor: [
        'rgba(212, 175, 55, 0.9)',
        'rgba(99, 102, 241, 0.9)',
        'rgba(16, 185, 129, 0.9)',
        'rgba(245, 158, 11, 0.9)',
        'rgba(239, 68, 68, 0.9)',
        'rgba(139, 92, 246, 0.9)'
      ],
      borderWidth: 0
    }]
  };

  pieChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      }
    }
  };
}
