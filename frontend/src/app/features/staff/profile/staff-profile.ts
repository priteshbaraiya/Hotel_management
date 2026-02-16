import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-staff-profile',
    imports: [ReactiveFormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div>
      <h1 class="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

      <div class="bg-white rounded-xl shadow-sm overflow-hidden max-w-2xl">
        <div class="p-8">
            <div class="flex items-center mb-6">
                <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    KP
                </div>
                <div class="ml-4">
                    <h2 class="text-xl font-bold text-gray-900">Kiran Patel</h2>
                    <p class="text-gray-500">Front Desk Manager</p>
                </div>
            </div>

            <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
                <div class="grid grid-cols-1 gap-6 mb-6">
                     <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input type="text" formControlName="name" class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50" readonly>
                    </div>
                     <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input type="email" formControlName="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50" readonly>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input type="tel" formControlName="phone" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                </div>

                <div class="border-t border-gray-100 pt-6 mt-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-4">Change Password</h3>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                            <input type="password" formControlName="currentPassword" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <input type="password" formControlName="newPassword" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                    </div>
                </div>

                <div class="mt-8 flex justify-end">
                    <button type="submit" [disabled]="profileForm.invalid || profileForm.pristine" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50">Save Changes</button>
                </div>
            </form>
        </div>
      </div>
    </div>
  `
})
export class StaffProfile {
    private fb = inject(FormBuilder);

    profileForm: FormGroup = this.fb.group({
        name: [{ value: 'Kiran Patel', disabled: true }],
        email: [{ value: 'kiran.patel@royalhotel.com', disabled: true }],
        phone: ['+91 98765 43210', Validators.required],
        currentPassword: [''],
        newPassword: ['']
    });

    onSubmit() {
        if (this.profileForm.valid) {
            console.log('Profile Updated:', this.profileForm.getRawValue());
            alert('Profile updated successfully');
        }
    }
}
