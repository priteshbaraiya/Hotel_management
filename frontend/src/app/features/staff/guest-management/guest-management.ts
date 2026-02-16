import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guest-management',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Guest Management</h1>
        <div class="flex space-x-2">
            <input type="text" placeholder="Search guests..." class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500">
            <button class="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800">Search</button>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            @for (guest of guests; track guest.id) {
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                        {{ guest.name.charAt(0) }}
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ guest.name }}</div>
                      <div class="text-sm text-gray-500">ID: #{{ guest.id }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ guest.email }}</div>
                  <div class="text-sm text-gray-500">{{ guest.phone }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ guest.room }}</div>
                  <div class="text-sm text-gray-500">{{ guest.checkIn }} - {{ guest.checkOut }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span [ngClass]="{
                    'bg-green-100 text-green-800': guest.status === 'Active',
                    'bg-yellow-100 text-yellow-800': guest.status === 'Pending',
                    'bg-blue-100 text-blue-800': guest.status === 'Checked Out'
                  }" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ guest.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button class="text-blue-600 hover:text-blue-900 mr-4">View</button>
                  <button class="text-red-600 hover:text-red-900">Checkout</button>
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
export class GuestManagement {
  guests = [
    { id: 'G-101', name: 'Ramesh Desai', email: 'ramesh.desai@example.com', phone: '+91 98765 43210', room: '302 (Deluxe)', checkIn: 'Oct 20', checkOut: 'Oct 25', status: 'Active' },
    { id: 'G-102', name: 'Kirit Shah', email: 'kirit.shah@example.com', phone: '+91 98765 43211', room: '105 (Suite)', checkIn: 'Oct 22', checkOut: 'Oct 24', status: 'Checked Out' },
    { id: 'G-103', name: 'Jitendra Mehta', email: 'jitendra.mehta@example.com', phone: '+91 98765 43212', room: 'Pending', checkIn: 'Oct 25', checkOut: 'Oct 30', status: 'Pending' }
  ];
}
