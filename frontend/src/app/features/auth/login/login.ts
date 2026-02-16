import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, TitleCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl border border-white/20">
        <div class="text-center">
          <h2 class="text-3xl font-serif font-bold text-white">Welcome Back</h2>
          <p class="mt-2 text-sm text-gray-300">
            Sign in to access your dashboard
          </p>
        </div>
        
        @if (errorMessage()) {
          <div class="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm">
            {{ errorMessage() }}
          </div>
        }
        
        <form class="mt-8 space-y-6" [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <!-- Role Selector Menu -->
          <div class="flex justify-center space-x-2 mb-6">
            <button 
              type="button" 
              (click)="selectRole('guest')"
              [class]="selectedRole() === 'guest' ? 'role-btn-active' : 'role-btn'"
              class="px-4 py-2 rounded-lg font-medium transition-all duration-300">
              <span class="mr-2">👤</span> Guest
            </button>
            <button 
              type="button" 
              (click)="selectRole('staff')"
              [class]="selectedRole() === 'staff' ? 'role-btn-active' : 'role-btn'"
              class="px-4 py-2 rounded-lg font-medium transition-all duration-300">
              <span class="mr-2">🛎️</span> Staff
            </button>
            <button 
              type="button" 
              (click)="selectRole('admin')"
              [class]="selectedRole() === 'admin' ? 'role-btn-active' : 'role-btn'"
              class="px-4 py-2 rounded-lg font-medium transition-all duration-300">
              <span class="mr-2">⚙️</span> Admin
            </button>
          </div>
          
          <div class="space-y-4">
            <div>
              <label for="email-address" class="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
              <input 
                id="email-address" 
                formControlName="email" 
                type="email" 
                autocomplete="email" 
                class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition" 
                placeholder="Enter your email">
            </div>
            <div>
              <label for="password" class="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <div class="relative">
                <input 
                  id="password" 
                  formControlName="password" 
                  [type]="showPassword() ? 'text' : 'password'" 
                  autocomplete="current-password" 
                  class="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition" 
                  placeholder="Enter your password">
                <button 
                  type="button" 
                  (click)="togglePasswordVisibility()" 
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition focus:outline-none"
                  [attr.aria-label]="showPassword() ? 'Hide password' : 'Show password'">
                  @if (showPassword()) {
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                    </svg>
                  } @else {
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  }
                </button>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-gold-600 focus:ring-gold-500">
              <label for="remember-me" class="ml-2 block text-sm text-gray-300">
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <a routerLink="/forgot-password" class="font-medium text-gold-400 hover:text-gold-300 transition">
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button 
              type="submit" 
              [disabled]="loginForm.invalid || isLoading()" 
              class="w-full flex justify-center py-3 px-4 rounded-lg text-sm font-semibold text-gray-900 bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl">
              @if (isLoading()) {
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              } @else {
                Sign In as {{ selectedRole() | titlecase }}
              }
            </button>
          </div>
        </form>
        
        <div class="text-center">
          <p class="text-gray-400 text-sm">
            Don't have an account? 
            <a routerLink="/register" class="font-medium text-gold-400 hover:text-gold-300 transition">Create one</a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: `
    .text-gold-400 { color: #e6c455; }
    .text-gold-500 { color: #d4af37; }
    .text-gold-600 { color: #c5a028; }
    .bg-gold-600 { background-color: #d4af37; }
    .from-gold-400 { --tw-gradient-from: #e6c455; }
    .to-gold-600 { --tw-gradient-to: #d4af37; }
    .from-gold-500 { --tw-gradient-from: #d4af37; }
    .to-gold-700 { --tw-gradient-to: #b5952f; }
    .focus\\:ring-gold-500:focus { --tw-ring-color: #d4af37; }
    
    .role-btn {
      background-color: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .role-btn:hover {
      background-color: rgba(255, 255, 255, 0.2);
      color: white;
    }
    .role-btn-active {
      background: linear-gradient(to right, #e6c455, #d4af37);
      color: #1a1a1a;
      border: 1px solid #d4af37;
      box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
    }
  `
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  selectedRole = signal<'guest' | 'staff' | 'admin'>('guest');
  isLoading = signal(false);
  errorMessage = signal('');
  showPassword = signal(false);

  selectRole(role: 'guest' | 'staff' | 'admin') {
    this.selectedRole.set(role);
  }

  togglePasswordVisibility() {
    this.showPassword.update(v => !v);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');

      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          this.isLoading.set(false);
          // Login successful - redirect handled by service (saveToStorage etc)
          // But service redirects based on role, so we don't need to do anything here except maybe
          // ensure redirect if service doesn't do it? Authenticated state update handles it usually.
          // Wait, auth.service.login handles redirection.
        },
        error: (err) => {
          this.isLoading.set(false);
          if (err.status === 0) {
            this.errorMessage.set('Cannot connect to server. Please make sure the backend is running.');
          } else {
            this.errorMessage.set(err.error?.msg || 'Login failed. Please check your credentials.');
          }
        }
      });
    }
  }
}
