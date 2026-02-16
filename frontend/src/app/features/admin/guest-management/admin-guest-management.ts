import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-guest-management',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Manage Guests</h1>
        <div class="flex space-x-2">
            <input type="text" placeholder="Search guests..." class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500">
            <select class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500">
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
            </select>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Date</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            @for (guest of guests; track guest.id) {
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                        {{ guest.name.charAt(0) }}
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ guest.name }}</div>
                      <div class="text-sm text-gray-500">ID: #{{ guest.id }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ guest.registeredDate }}</div>
                </td>
                 <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ guest.email }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span [ngClass]="{
                    'bg-green-100 text-green-800': guest.status === 'Approved',
                    'bg-yellow-100 text-yellow-800': guest.status === 'Pending',
                    'bg-red-100 text-red-800': guest.status === 'Blocked'
                  }" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ guest.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  @if (guest.status === 'Pending') {
                      <button class="text-green-600 hover:text-green-900 mr-4">Approve</button>
                  }
                  @if (guest.status !== 'Blocked') {
                      <button class="text-red-600 hover:text-red-900">Block</button>
                  } @else {
                      <button class="text-green-600 hover:text-green-900">Unblock</button>
                  }
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: `
    .focus\\:ring-gold-500:focus { --tw-ring-color: #d4af37; }
  `
})
export class AdminGuestManagement {
  guests = [
    { id: 'G-101', name: 'Ramesh Desai', email: 'ramesh.desai@example.com', registeredDate: '2026-10-01', status: 'Approved' },
    { id: 'G-104', name: 'Ashok Pandya', email: 'ashok.pandya@example.com', registeredDate: '2026-10-24', status: 'Blocked' },
    { id: 'G-105', name: 'Jitendra Mehta', email: 'jitendra.mehta@example.com', registeredDate: '2026-10-24', status: 'Pending' }
  ];
}
