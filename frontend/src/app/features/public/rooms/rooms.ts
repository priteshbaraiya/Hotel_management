import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';

interface Room {
  id: number;
  name: string;
  description: string;
  price: number;
  guests: number;
  size: number;
  image: string;
}

@Component({
  selector: 'app-rooms',
  imports: [RouterLink, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-gray-50 dark:bg-gray-950 min-h-screen py-12">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">Luxurious Accommodations</h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Choose from our selection of elegantly appointed rooms and suites.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (room of rooms; track room.id) {
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition flex flex-col h-full">
              <div class="h-64 overflow-hidden relative group">
                <img [src]="room.image" [alt]="room.name" class="w-full h-full object-cover transform group-hover:scale-110 transition duration-500">
                <div class="absolute top-4 right-4 bg-gold-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  ₹{{ room.price | number:'1.0-0' }} / night
                </div>
              </div>
              <div class="p-6 flex flex-col flex-grow">
                <h3 class="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-2">{{ room.name }}</h3>
                <p class="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{{ room.description }}</p>
                <div class="space-y-2 mb-6">
                  <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <i class="fas fa-user-friends w-6 text-center text-gold-600"></i>
                    <span>Max Guests: {{ room.guests }}</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <i class="fas fa-bed w-6 text-center text-gold-600"></i>
                    <span>{{ room.size }} sq. ft.</span>
                  </div>
                </div>
                <a routerLink="/booking" [queryParams]="{ roomId: room.id }" class="block w-full text-center px-6 py-3 border border-gold-600 text-gold-600 dark:text-gold-500 rounded-lg hover:bg-gold-600 hover:text-white transition font-medium">
                  Book Now
                </a>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: `
    .text-gold-600 { color: #d4af37; }
    .bg-gold-600 { background-color: #d4af37; }
    .hover\\:bg-gold-600:hover { background-color: #d4af37; }
    .border-gold-600 { border-color: #d4af37; }
  `
})
export class Rooms {
  rooms: Room[] = [
    {
      id: 1,
      name: 'Deluxe King Room',
      description: 'Spacious room with a king-sized bed, panoramic city views, and a modern marble bathroom.',
      price: 24799,
      guests: 2,
      size: 450,
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      name: 'Executive Suite',
      description: 'Separate living area, access to the executive lounge, and premium amenities for business travelers.',
      price: 37399,
      guests: 3,
      size: 650,
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      name: 'Ocean View Suite',
      description: 'Breathtaking ocean views, private balcony, and a luxurious jacuzzi for ultimate relaxation.',
      price: 49799,
      guests: 2,
      size: 700,
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      name: 'Family Suite',
      description: 'Two bedrooms, a kitchenette, and ample space for the whole family to unwind comfortably.',
      price: 53999,
      guests: 4,
      size: 900,
      image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 5,
      name: 'The Royal Penthouse',
      description: 'The pinnacle of opulence. Top floor, private terrace, grand piano, and dedicated butler service.',
      price: 207499,
      guests: 6,
      size: 2000,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 6,
      name: 'Presidential Suite',
      description: 'Unmatched luxury with multiple bedrooms, a private dining room, and state-of-the-art entertainment.',
      price: 290499,
      guests: 8,
      size: 2500,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];
}
