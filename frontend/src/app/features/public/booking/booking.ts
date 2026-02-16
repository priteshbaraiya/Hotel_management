import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="bg-gray-50 dark:bg-gray-950 min-h-screen py-12">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div class="bg-gray-900 py-8 px-8 text-center">
            <h2 class="text-3xl font-serif font-bold text-white mb-2">Book Your Stay</h2>
            <p class="text-gray-400">Secure your reservation at The Royal Hotel.</p>
          </div>

          <form [formGroup]="bookingForm" (ngSubmit)="onSubmit()" class="p-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <!-- Check-in Date -->
              <div>
                <label for="checkIn" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Check-in Date</label>
                <input type="date" id="checkIn" formControlName="checkIn" class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition">
              </div>

              <!-- Check-out Date -->
              <div>
                <label for="checkOut" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Check-out Date</label>
                <input type="date" id="checkOut" formControlName="checkOut" class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition">
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <!-- Room Type -->
              <div>
                <label for="roomType" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Room Type</label>
                <select id="roomType" formControlName="roomType" class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition bg-white dark:bg-gray-700">
                  <option value="" disabled selected class="text-gray-500">Select a room</option>
                  @for (room of roomTypes; track room.id) {
                    <option [value]="room.id">{{ room.name }}</option>
                  }
                </select>
              </div>

              <!-- Guests -->
              <div>
                <label for="guests" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Guests</label>
                <select id="guests" formControlName="guests" class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition bg-white dark:bg-gray-700">
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5+ Guests</option>
                </select>
              </div>
            </div>

            <!-- Special Requests -->
            <div class="mb-8">
              <label for="specialRequests" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Special Requests</label>
              <textarea id="specialRequests" formControlName="specialRequests" rows="3" class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition" placeholder="Any specific requirements..."></textarea>
            </div>

            <!-- Submit Button -->
            <button type="submit" [disabled]="bookingForm.invalid" class="w-full py-4 bg-gold-600 text-white rounded-lg font-bold text-lg hover:bg-gold-700 transition transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
              Check Availability & Book
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: `
    .text-gold-500 { color: #d4af37; }
    .bg-gold-600 { background-color: #d4af37; }
    .bg-gold-700 { background-color: #b5952f; }
    .focus\\:ring-gold-500:focus { --tw-ring-color: #d4af37; }
  `
})
export class Booking {
  bookingForm: FormGroup;
  roomTypes = [
    { id: 1, name: 'Deluxe King Room' },
    { id: 2, name: 'Executive Suite' },
    { id: 3, name: 'Ocean View Suite' },
    { id: 4, name: 'Family Suite' },
    { id: 5, name: 'The Royal Penthouse' },
    { id: 6, name: 'Presidential Suite' }
  ];

  constructor(private fb: FormBuilder) {
    this.bookingForm = this.fb.group({
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      roomType: ['', Validators.required],
      guests: ['1', Validators.required],
      specialRequests: ['']
    });
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      console.log('Booking Data:', this.bookingForm.value);
      // Mock booking submission
      setTimeout(() => {
        alert('Booking request received! We will contact you shortly to confirm availability.');
        this.bookingForm.reset({ guests: '1' });
      }, 1000);
    }
  }
}
