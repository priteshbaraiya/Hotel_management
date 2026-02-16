import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Booking {
  id: string;
  roomName: string;
  checkIn: Date;
  checkOut: Date;
  status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed';
  price: number;
  image: string;
}

@Component({
  selector: 'app-booking-history',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-8">
      <h1 class="text-3xl font-serif font-bold text-gray-900 mb-8">My Bookings</h1>

      <div class="space-y-6">
        @for (booking of bookings; track booking.id) {
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
            <div class="md:w-48 h-48 md:h-auto relative">
              <img [src]="booking.image" [alt]="booking.roomName" class="w-full h-full object-cover absolute inset-0">
            </div>
            <div class="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div class="flex justify-between items-start mb-2">
                  <h3 class="text-xl font-bold text-gray-900">{{ booking.roomName }}</h3>
                  <span [ngClass]="{
                    'bg-green-100 text-green-800': booking.status === 'Confirmed',
                    'bg-yellow-100 text-yellow-800': booking.status === 'Pending',
                    'bg-red-100 text-red-800': booking.status === 'Cancelled',
                    'bg-gray-100 text-gray-800': booking.status === 'Completed'
                  }" class="px-3 py-1 rounded-full text-xs font-medium">
                    {{ booking.status }}
                  </span>
                </div>
                <p class="text-gray-500 text-sm mb-4">Booking ID: #{{ booking.id }}</p>
                
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p class="text-gray-500">Check-in</p>
                    <p class="font-medium">{{ booking.checkIn | date:'mediumDate' }}</p>
                  </div>
                  <div>
                    <p class="text-gray-500">Check-out</p>
                    <p class="font-medium">{{ booking.checkOut | date:'mediumDate' }}</p>
                  </div>
                </div>
              </div>
              
              <div class="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                <p class="font-bold text-lg text-gold-600">₹{{ booking.price | number:'1.0-0' }}</p>
                @if (booking.status === 'Confirmed' || booking.status === 'Pending') {
                  <button class="text-red-600 hover:text-red-700 text-sm font-medium">Cancel Booking</button>
                }
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: `
    .text-gold-600 { color: #d4af37; }
  `
})
export class BookingHistory {
  bookings: Booking[] = [
    {
      id: 'B-7829',
      roomName: 'Deluxe King Room',
      checkIn: new Date('2026-10-15'),
      checkOut: new Date('2026-10-18'),
      status: 'Confirmed',
      price: 897,
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'B-5521',
      roomName: 'Ocean View Suite',
      checkIn: new Date('2025-12-24'),
      checkOut: new Date('2025-12-28'),
      status: 'Completed',
      price: 2396,
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
    }
  ];
}
