import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-staff-management',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Manage Staff</h1>
        <button class="bg-gold-600 text-white px-4 py-2 rounded-lg hover:bg-gold-700 transition flex items-center shadow-md">
            <i class="fas fa-plus mr-2"></i> Add Staff Member
        </button>
      </div>

      <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            @for (member of staffMembers; track member.id) {
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                        {{ member.name.charAt(0) }}
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ member.name }}</div>
                      <div class="text-sm text-gray-500">ID: #{{ member.id }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ member.role }}</div>
                  <div class="text-sm text-gray-500">{{ member.department }}</div>
                </td>
                 <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ member.email }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span [ngClass]="{
                    'bg-green-100 text-green-800': member.status === 'Active',
                    'bg-red-100 text-red-800': member.status === 'Inactive'
                  }" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ member.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button class="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                  <button class="text-red-600 hover:text-red-900">Remove</button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: `
    .bg-gold-600 { background-color: #d4af37; }
    .bg-gold-700 { background-color: #b5952f; }
  `
})
export class StaffManagement {
  staffMembers = [
    { id: 'S-001', name: 'Mahesh Patel', role: 'Manager', department: 'Front Desk', email: 'mahesh.patel@royalhotel.com', status: 'Active' },
    { id: 'S-002', name: 'Bhavesh Trivedi', role: 'Supervisor', department: 'Housekeeping', email: 'bhavesh.trivedi@royalhotel.com', status: 'Active' },
    { id: 'S-003', name: 'Dinesh Joshi', role: 'Guard', department: 'Security', email: 'dinesh.joshi@royalhotel.com', status: 'Inactive' }
  ];
}
