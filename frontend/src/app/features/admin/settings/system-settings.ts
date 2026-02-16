import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-system-settings',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
    <div>
      <h1 class="text-3xl font-bold text-gray-900 mb-8">System Settings</h1>

      <div class="bg-white rounded-xl shadow-sm overflow-hidden max-w-3xl">
        <div class="p-8">
            <h3 class="text-xl font-bold text-gray-900 mb-6 border-b pb-2">General Settings</h3>
            
            <form>
                <div class="space-y-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <label class="block text-sm font-medium text-gray-900">Maintenance Mode</label>
                            <p class="text-sm text-gray-500">Prevent users from accessing the booking system.</p>
                        </div>
                        <div class="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full bg-gray-200 cursor-pointer">
                            <input type="checkbox" class="absolute w-6 h-6 bg-white rounded-full border border-gray-300 shadow-sm appearance-none cursor-pointer transition-transform duration-200 ease-in-out checked:translate-x-6 checked:border-gold-600 focus:outline-none">
                        </div>
                    </div>
                    
                    <div class="flex items-center justify-between">
                        <div>
                            <label class="block text-sm font-medium text-gray-900">Email Notifications</label>
                            <p class="text-sm text-gray-500">Send automatic emails for new bookings.</p>
                        </div>
                         <div class="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full bg-green-200 cursor-pointer">
                            <input type="checkbox" checked class="absolute w-6 h-6 bg-white rounded-full border border-gray-300 shadow-sm appearance-none cursor-pointer transition-transform duration-200 ease-in-out checked:translate-x-6 checked:border-green-600 focus:outline-none translate-x-6">
                        </div>
                    </div>

                    <div class="border-t pt-6">
                         <h3 class="text-xl font-bold text-gray-900 mb-6">Payment Gateway</h3>
                         <div class="grid grid-cols-1 gap-4">
                             <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Stripe API Key</label>
                                <input type="password" value="sk_test_..." class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
                             </div>
                             <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                                <select class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                                    <option>INR (₹)</option>
                                    <option>USD ($)</option>
                                    <option>EUR (€)</option>
                                    <option>EUR (€)</option>
                                    <option>INR (₹)</option>
                                </select>
                             </div>
                         </div>
                    </div>
                </div>

                <div class="mt-8 flex justify-end">
                    <button type="button" class="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition">Save Configuration</button>
                </div>
            </form>
        </div>
      </div>
    </div>
  `
})
export class SystemSettings { }
