import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="flex h-screen bg-gray-100 dark:bg-gray-900">
      <!-- Sidebar -->
      <aside class="w-64 bg-gray-900 dark:bg-black text-white flex flex-col">
        <div class="h-20 flex items-center justify-center border-b border-gray-800 dark:border-gray-800">
          <a routerLink="/" class="text-2xl font-serif font-bold">
            Royal <span class="text-gold-500">Admin</span>
          </a>
        </div>
        
        <nav class="flex-1 px-4 py-6 space-y-2">
          <a routerLink="/admin/dashboard" routerLinkActive="bg-gold-600 text-white" class="flex items-center px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition">
            <i class="fas fa-tachometer-alt w-6"></i>
            <span class="font-medium">Dashboard</span>
          </a>
          <a routerLink="/admin/staff" routerLinkActive="bg-gold-600 text-white" class="flex items-center px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition">
            <i class="fas fa-user-tie w-6"></i>
            <span class="font-medium">Manage Staff</span>
          </a>
          <a routerLink="/admin/guests" routerLinkActive="bg-gold-600 text-white" class="flex items-center px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition">
            <i class="fas fa-users w-6"></i>
            <span class="font-medium">Manage Guests</span>
          </a>
           <a routerLink="/admin/settings" routerLinkActive="bg-gold-600 text-white" class="flex items-center px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition">
            <i class="fas fa-cogs w-6"></i>
            <span class="font-medium">Settings</span>
          </a>
        </nav>

        <div class="p-4 border-t border-gray-800 dark:border-gray-800">
          <button (click)="logout()" class="w-full flex items-center px-4 py-3 text-gray-400 hover:text-white transition focus:outline-none">
            <i class="fas fa-sign-out-alt w-6"></i>
            <span class="font-medium ml-3">Logout</span>
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto">
        <header class="bg-white dark:bg-gray-800 shadow px-8 py-4 flex justify-between items-center">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white">Administrator Panel</h2>
          <div class="flex items-center space-x-4">
            <span class="text-gray-600 dark:text-gray-300">Admin User</span>
            <div class="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 font-bold">AD</div>
          </div>
        </header>
        <div class="p-8">
           <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: `
    .text-gold-500 { color: #d4af37; }
    .bg-gold-600 { background-color: #d4af37; }
  `
})
export class AdminLayout {
  private authService = inject(AuthService);
  private router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
