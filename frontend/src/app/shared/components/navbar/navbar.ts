import { Component, signal, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="fixed w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-sm">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-20">
          <!-- Logo -->
          <a routerLink="/" class="flex items-center gap-2">
            <div class="w-10 h-10 bg-gold-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-serif font-bold text-lg">RH</span>
            </div>
            <span class="text-xl font-serif font-bold text-gray-900">The Royal <span class="text-gold-600">Hotel</span></span>
          </a>

          <!-- Desktop Menu -->
          <div class="hidden lg:flex items-center space-x-6">
            <a routerLink="/" routerLinkActive="text-gold-600" [routerLinkActiveOptions]="{exact: true}" class="text-gray-700 hover:text-gold-600 font-medium transition">Home</a>
            <a routerLink="/rooms" routerLinkActive="text-gold-600" class="text-gray-700 hover:text-gold-600 font-medium transition">Rooms</a>
            <a routerLink="/services" routerLinkActive="text-gold-600" class="text-gray-700 hover:text-gold-600 font-medium transition">Services</a>
            <a routerLink="/gallery" routerLinkActive="text-gold-600" class="text-gray-700 hover:text-gold-600 font-medium transition">Gallery</a>
            <a routerLink="/offers" routerLinkActive="text-gold-600" class="text-gray-700 hover:text-gold-600 font-medium transition">Offers</a>
            <a routerLink="/booking" routerLinkActive="text-gold-600" class="text-gray-700 hover:text-gold-600 font-medium transition">Booking</a>
          </div>

          <!-- Search & Auth -->
          <div class="hidden lg:flex items-center space-x-4">
            <!-- Search & Theme -->
            <div class="relative flex items-center gap-2">
              <button (click)="toggleTheme()" class="p-2 text-gray-600 hover:text-gold-600 dark:text-gray-300 dark:hover:text-gold-500 transition rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                @if (isDarkMode()) {
                  <!-- Sun Icon -->
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                } @else {
                  <!-- Moon Icon -->
                   <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                  </svg>
                }
              </button>

              <button (click)="toggleSearch()" class="p-2 text-gray-600 hover:text-gold-600 dark:text-gray-300 dark:hover:text-gold-500 transition">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
              @if (isSearchOpen()) {
                <div class="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-2xl p-4 animate-fade-in">
                  <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <input 
                      type="text" 
                      [(ngModel)]="searchQuery"
                      (keyup.enter)="performSearch()"
                      placeholder="Search rooms, services..." 
                      class="flex-1 px-4 py-2 outline-none text-sm">
                    <button (click)="performSearch()" class="px-4 py-2 bg-gold-600 text-white hover:bg-gold-700 transition">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                    </button>
                  </div>
                  <div class="mt-3 text-xs text-gray-500">
                    <p>Quick links:</p>
                    <div class="flex flex-wrap gap-2 mt-2">
                      <a routerLink="/rooms" (click)="closeSearch()" class="px-2 py-1 bg-gray-100 rounded hover:bg-gold-50 transition">Rooms</a>
                      <a routerLink="/offers" (click)="closeSearch()" class="px-2 py-1 bg-gray-100 rounded hover:bg-gold-50 transition">Offers</a>
                      <a routerLink="/booking" (click)="closeSearch()" class="px-2 py-1 bg-gray-100 rounded hover:bg-gold-50 transition">Book Now</a>
                    </div>
                  </div>
                </div>
              }
            </div>

            @if (isAuthenticated()) {
              <span class="text-gray-700 font-medium text-sm">
                Hi, {{ userName() }}
              </span>
              <a [routerLink]="dashboardLink()" class="px-4 py-2 text-gold-600 border border-gold-600 rounded-full text-sm hover:bg-gold-50 transition">
                Dashboard
              </a>
              <button (click)="logout()" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300 transition">
                Logout
              </button>
            } @else {
              <a routerLink="/login" class="px-5 py-2 text-gold-600 border border-gold-600 rounded-full text-sm hover:bg-gold-50 transition">Login</a>
              <a routerLink="/booking" class="px-5 py-2 bg-gold-600 text-white rounded-full text-sm hover:bg-gold-700 transition shadow-lg">Book Now</a>
            }
          </div>

          <!-- Mobile Menu Button -->
          <button (click)="toggleMobileMenu()" class="lg:hidden text-gray-700 focus:outline-none p-2" aria-label="Toggle menu">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              @if (!isMobileMenuOpen()) {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              } @else {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              }
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      @if (isMobileMenuOpen()) {
        <div class="lg:hidden bg-white border-t border-gray-100 px-4 py-4 shadow-lg animate-fade-in-down">
          <!-- Mobile Search -->
          <div class="mb-4">
            <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <input 
                type="text" 
                [(ngModel)]="searchQuery"
                (keyup.enter)="performSearch(); closeMobileMenu()"
                placeholder="Search..." 
                class="flex-1 px-4 py-2 outline-none text-sm">
              <button (click)="performSearch(); closeMobileMenu()" class="px-4 py-2 bg-gold-600 text-white">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div class="flex flex-col space-y-3">
            <a routerLink="/" (click)="closeMobileMenu()" routerLinkActive="text-gold-600" [routerLinkActiveOptions]="{exact: true}" class="text-gray-700 hover:text-gold-600 font-medium transition py-2">Home</a>
            <a routerLink="/rooms" (click)="closeMobileMenu()" routerLinkActive="text-gold-600" class="text-gray-700 hover:text-gold-600 font-medium transition py-2">Rooms</a>
            <a routerLink="/services" (click)="closeMobileMenu()" routerLinkActive="text-gold-600" class="text-gray-700 hover:text-gold-600 font-medium transition py-2">Services</a>
            <a routerLink="/gallery" (click)="closeMobileMenu()" routerLinkActive="text-gold-600" class="text-gray-700 hover:text-gold-600 font-medium transition py-2">Gallery</a>
            <a routerLink="/offers" (click)="closeMobileMenu()" routerLinkActive="text-gold-600" class="text-gray-700 hover:text-gold-600 font-medium transition py-2">Offers</a>
            <a routerLink="/booking" (click)="closeMobileMenu()" routerLinkActive="text-gold-600" class="text-gray-700 hover:text-gold-600 font-medium transition py-2">Booking</a>
            <hr class="border-gray-100">
            @if (isAuthenticated()) {
              <span class="text-gray-700 font-medium py-2">Welcome, {{ userName() }}</span>
              <a [routerLink]="dashboardLink()" (click)="closeMobileMenu()" class="text-center w-full px-6 py-2 text-gold-600 border border-gold-600 rounded-full hover:bg-gold-50 transition">Dashboard</a>
              <button (click)="logout(); closeMobileMenu()" class="w-full px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition">Logout</button>
            } @else {
              <a routerLink="/login" (click)="closeMobileMenu()" class="text-center w-full px-6 py-2 text-gold-600 border border-gold-600 rounded-full hover:bg-gold-50 transition">Login</a>
              <a routerLink="/booking" (click)="closeMobileMenu()" class="text-center w-full px-6 py-2 bg-gold-600 text-white rounded-full hover:bg-gold-700 transition shadow-lg">Book Now</a>
            }
          </div>
        </div>
      }
    </nav>
  `,
  styles: `
    .text-gold-600 { color: #d4af37; }
    .bg-gold-600 { background-color: #d4af37; }
    .hover\\:bg-gold-700:hover { background-color: #b5952f; }
    .border-gold-600 { border-color: #d4af37; }
    .hover\\:bg-gold-50:hover { background-color: #fdfcfabe; }
    .animate-fade-in-down { animation: fadeInDown 0.3s ease-out; }
    .animate-fade-in { animation: fadeIn 0.2s ease-out; }
    @keyframes fadeInDown {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `
})
export class Navbar {
  private authService = inject(AuthService);
  private themeService = inject(ThemeService);
  private router = inject(Router);

  isDarkMode = this.themeService.darkMode;

  isMobileMenuOpen = signal(false);
  isSearchOpen = signal(false);
  searchQuery = '';

  isAuthenticated = this.authService.isAuthenticated;

  userName = computed(() => {
    const user = this.authService.currentUser();
    return user ? `${user.firstName}` : '';
  });

  dashboardLink = computed(() => {
    const role = this.authService.userRole();
    switch (role) {
      case 'admin': return '/admin';
      case 'staff': return '/staff';
      default: return '/guest';
    }
  });

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
    this.isSearchOpen.set(false);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }

  toggleSearch() {
    this.isSearchOpen.update(v => !v);
  }

  closeSearch() {
    this.isSearchOpen.set(false);
  }

  performSearch() {
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      if (query.includes('room') || query.includes('suite') || query.includes('stay')) {
        this.router.navigate(['/rooms']);
      } else if (query.includes('offer') || query.includes('deal') || query.includes('discount')) {
        this.router.navigate(['/offers']);
      } else if (query.includes('spa') || query.includes('pool') || query.includes('dining') || query.includes('service')) {
        this.router.navigate(['/services']);
      } else if (query.includes('book')) {
        this.router.navigate(['/booking']);
      } else if (query.includes('gallery') || query.includes('photo')) {
        this.router.navigate(['/gallery']);
      } else {
        this.router.navigate(['/rooms']);
      }
      this.searchQuery = '';
      this.closeSearch();
    }
  }

  logout() {
    this.authService.logout();
  }
}
