import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-8">
      <h1 class="text-3xl font-serif font-bold text-gray-900 mb-8">My Profile</h1>

      <div class="max-w-2xl bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-8">
          <div class="flex items-center mb-8">
            <div class="w-20 h-20 bg-gradient-to-br from-gold-500 to-gold-700 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              AP
            </div>
            <div class="ml-6">
              <h2 class="text-xl font-bold text-gray-900">Amit Patel</h2>
              <p class="text-gray-500">amit.patel@gmail.com</p>
              <span class="inline-block mt-2 bg-gold-100 text-gold-800 text-xs px-2 py-1 rounded-full font-medium">Gold Member</span>
            </div>
          </div>

          <form [formGroup]="passwordForm" (ngSubmit)="onSubmit()">
            <h3 class="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Change Password</h3>
            
            <div class="space-y-6">
              <div>
                <label for="currentPassword" class="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input id="currentPassword" formControlName="currentPassword" type="password" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition">
              </div>

               <div>
                <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input id="newPassword" formControlName="newPassword" type="password" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition">
                <p class="mt-1 text-xs text-gray-500">Minimum 8 characters.</p>
              </div>

               <div>
                <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <input id="confirmPassword" formControlName="confirmPassword" type="password" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition">
              </div>
            </div>

            <div class="mt-8 flex justify-end">
              <button type="submit" [disabled]="passwordForm.invalid" class="px-6 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: `
    .text-gold-800 { color: #8a7224; }
    .bg-gold-100 { background-color: #fceec5; }
    .bg-gold-500 { background-color: #d4af37; }
    .bg-gold-600 { background-color: #d4af37; }
    .bg-gold-700 { background-color: #b5952f; }
    .from-gold-500 { --tw-gradient-from: #d4af37; }
    .to-gold-700 { --tw-gradient-to: #b5952f; }
    .focus\\:ring-gold-500:focus { --tw-ring-color: #d4af37; }
  `
})
export class Profile {
  private fb = inject(FormBuilder);

  passwordForm: FormGroup = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required]
  });

  onSubmit() {
    if (this.passwordForm.valid) {
      if (this.passwordForm.value.newPassword !== this.passwordForm.value.confirmPassword) {
        alert('New passwords do not match');
        return;
      }
      console.log('Password Update:', this.passwordForm.value);
      alert('Password updated successfully!');
      this.passwordForm.reset();
    }
  }
}
