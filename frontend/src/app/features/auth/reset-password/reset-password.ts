import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-reset-password',
    imports: [ReactiveFormsModule, RouterLink],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl border border-white/20">
        <div class="text-center">
          <h2 class="text-3xl font-serif font-bold text-white">Reset Password</h2>
          <p class="mt-2 text-sm text-gray-300">
            Enter your new password below.
          </p>
        </div>

        @if (errorMessage()) {
          <div class="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm">
            {{ errorMessage() }}
          </div>
        }

        @if (successMessage()) {
          <div class="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded-lg text-sm">
            {{ successMessage() }}
          </div>
          <a routerLink="/login" class="block w-full text-center py-3 px-4 rounded-lg text-sm font-semibold text-gray-900 bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            Go to Login
          </a>
        } @else {
          <form class="mt-8 space-y-6" [formGroup]="resetForm" (ngSubmit)="onSubmit()">
            <div class="space-y-4">
              <div>
                <label for="password" class="block text-sm font-medium text-gray-300 mb-1">New Password</label>
                <input 
                  id="password" 
                  formControlName="password" 
                  type="password" 
                  autocomplete="new-password" 
                  class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition" 
                  placeholder="Enter new password (min 6 characters)">
              </div>
              <div>
                <label for="confirmPassword" class="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
                <input 
                  id="confirmPassword" 
                  formControlName="confirmPassword" 
                  type="password" 
                  class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition" 
                  placeholder="Confirm new password">
              </div>
            </div>

            <div>
              <button 
                type="submit" 
                [disabled]="resetForm.invalid || isLoading()" 
                class="w-full flex justify-center py-3 px-4 rounded-lg text-sm font-semibold text-gray-900 bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl">
                @if (isLoading()) {
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Resetting...
                } @else {
                  Reset Password
                }
              </button>
            </div>

            <div class="text-center">
              <a routerLink="/login" class="font-medium text-gold-400 hover:text-gold-300 transition">
                Back to Login
              </a>
            </div>
          </form>
        }
      </div>
    </div>
  `,
    styles: `
    .text-gold-400 { color: #e6c455; }
    .text-gold-500 { color: #d4af37; }
    .from-gold-400 { --tw-gradient-from: #e6c455; }
    .to-gold-600 { --tw-gradient-to: #d4af37; }
    .from-gold-500 { --tw-gradient-from: #d4af37; }
    .to-gold-700 { --tw-gradient-to: #b5952f; }
    .focus\\:ring-gold-500:focus { --tw-ring-color: #d4af37; }
  `
})
export class ResetPassword {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    private token = '';

    resetForm: FormGroup = this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
    });

    isLoading = signal(false);
    errorMessage = signal('');
    successMessage = signal('');

    constructor() {
        this.token = this.route.snapshot.paramMap.get('token') || '';
        if (!this.token) {
            this.errorMessage.set('Invalid reset link');
        }
    }

    onSubmit() {
        if (this.resetForm.valid) {
            if (this.resetForm.value.password !== this.resetForm.value.confirmPassword) {
                this.errorMessage.set('Passwords do not match');
                return;
            }

            this.isLoading.set(true);
            this.errorMessage.set('');

            this.authService.resetPassword(this.token, this.resetForm.value.password).subscribe({
                next: (res) => {
                    this.isLoading.set(false);
                    this.successMessage.set(res.msg);
                },
                error: (err) => {
                    this.isLoading.set(false);
                    if (err.status === 0) {
                        this.errorMessage.set('Cannot connect to server. Please make sure the backend is running.');
                    } else {
                        this.errorMessage.set(err.error?.msg || 'Password reset failed');
                    }
                }
            });
        }
    }
}
