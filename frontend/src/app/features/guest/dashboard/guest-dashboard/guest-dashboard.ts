import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-guest-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="p-8">
      <div class="mb-8">
        <h1 class="text-3xl font-serif font-bold text-gray-900 dark:text-white">Welcome back, Amit Patel!</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">Here's what's happening with your stay.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <!-- Upcoming Stay Card -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-gray-900 dark:text-white">Upcoming Stay</h3>
            <span class="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs px-2 py-1 rounded-full font-medium">Confirmed</span>
          </div>
          <div class="space-y-3">
            <div class="flex items-start">
              <i class="fas fa-calendar text-gold-500 mt-1 w-6"></i>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Check-in</p>
                <p class="font-medium text-gray-900 dark:text-white">Oct 15, 2026</p>
              </div>
            </div>
            <div class="flex items-start">
              <i class="fas fa-bed text-gold-500 mt-1 w-6"></i>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Room Type</p>
                <p class="font-medium text-gray-900 dark:text-white">Deluxe King Room</p>
              </div>
            </div>
            <a routerLink="/guest/bookings" class="block text-center mt-4 text-gold-600 hover:text-gold-700 dark:text-gold-500 dark:hover:text-gold-400 text-sm font-medium">View Details &rarr;</a>
          </div>
        </div>

        <!-- Loyalty Points Card -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-gray-900 dark:text-white">Loyalty Points</h3>
            <i class="fas fa-crown text-gold-500 text-xl"></i>
          </div>
          <div class="text-center py-4">
            <p class="text-4xl font-bold text-gold-600">1,250</p>
            <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">Gold Member Status</p>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 class="font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div class="space-y-3">
            <a routerLink="/services" class="block w-full text-left px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition flex items-center">
              <i class="fas fa-spa w-8 text-gold-500"></i>
              <span>Book Spa Treatment</span>
            </a>
            <a routerLink="/services" class="block w-full text-left px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition flex items-center">
              <i class="fas fa-utensils w-8 text-gold-500"></i>
              <span>Reserve Table</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .text-gold-500 { color: #d4af37; }
    .text-gold-600 { color: #c5a028; }
  `
})
export class GuestDashboard { }
