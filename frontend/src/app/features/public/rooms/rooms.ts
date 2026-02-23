import { Component, ChangeDetectionStrategy, inject, OnInit, signal } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { DecimalPipe, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Room {
  _id: string;
  title: string;
  type: string;
  description: string;
  price: number;
  guests: number;
  size: number;
  amenities: string[];
  imagePath: string;
  isBooked: boolean;
  hotel?: { _id: string; name: string; city: string };
}

@Component({
  selector: 'app-rooms',
  imports: [RouterLink, DecimalPipe, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Hero Section -->
    <section class="relative h-[35vh] flex items-center justify-center overflow-hidden">
      <img src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070" alt="Rooms" class="absolute inset-0 w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70"></div>
      <div class="relative z-10 text-center text-white">
        <p class="text-gold-400 uppercase tracking-widest mb-2 font-medium">Accommodations</p>
        <h1 class="text-4xl md:text-6xl font-serif font-bold">Luxurious Rooms & Suites</h1>
        @if (hotelName()) {
          <p class="mt-3 text-lg text-gray-200">at <span class="text-gold-400 font-semibold">{{ hotelName() }}</span></p>
        }
      </div>
    </section>

    <!-- Room Type Filter Tabs -->
    <section class="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-20 z-30">
      <div class="container mx-auto px-4 py-3">
        <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <button
            (click)="filterByType('All')"
            [class]="'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ' + (activeType() === 'All' ? 'bg-gold-600 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700')"
          >All Rooms</button>
          @for (type of roomTypes(); track type) {
            <button
              (click)="filterByType(type)"
              [class]="'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ' + (activeType() === type ? 'bg-gold-600 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700')"
            >{{ type }}</button>
          }
        </div>
      </div>
    </section>

    <!-- Rooms Grid -->
    <div class="bg-gray-50 dark:bg-gray-950 min-h-screen py-12">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center mb-8">
          <p class="text-gray-600 dark:text-gray-400">
            Showing <span class="font-bold text-gold-600">{{ filteredRooms().length }}</span> rooms
            @if (activeType() !== 'All') {
              — <span class="font-bold text-gold-600">{{ activeType() }}</span>
            }
          </p>
        </div>

        @if (filteredRooms().length === 0) {
          <div class="text-center py-20">
            <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
            <h3 class="text-xl font-semibold text-gray-500 dark:text-gray-400">No rooms found</h3>
            <p class="text-gray-400 mt-2">Try selecting a different room type</p>
          </div>
        }

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (room of filteredRooms(); track room._id) {
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full group hover:-translate-y-1">
              <div class="h-64 overflow-hidden relative">
                <img [src]="room.imagePath" [alt]="room.title" class="w-full h-full object-cover transform group-hover:scale-110 transition duration-500">
                <div class="absolute top-4 right-4 bg-gold-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  ₹{{ room.price | number:'1.0-0' }} / night
                </div>
                <div class="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {{ room.type }}
                </div>
                @if (room.isBooked) {
                  <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span class="bg-red-600 text-white px-4 py-2 rounded-full font-bold text-sm">Currently Booked</span>
                  </div>
                }
              </div>
              <div class="p-6 flex flex-col flex-grow">
                <h3 class="text-xl font-serif font-bold text-gray-900 dark:text-white mb-1">{{ room.title }}</h3>
                @if (room.hotel) {
                  <p class="text-gold-600 text-xs font-bold uppercase tracking-wider mb-2">{{ room.hotel.name }} — {{ room.hotel.city }}</p>
                }
                <p class="text-gray-600 dark:text-gray-300 mb-4 flex-grow text-sm line-clamp-3">{{ room.description }}</p>

                <!-- Room Info -->
                <div class="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                  <div class="flex items-center gap-1">
                    <svg class="w-4 h-4 text-gold-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/></svg>
                    <span>{{ room.guests }} Guests</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <svg class="w-4 h-4 text-gold-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4z" clip-rule="evenodd"/></svg>
                    <span>{{ room.size }} sq.ft</span>
                  </div>
                </div>

                <!-- Amenities -->
                <div class="flex flex-wrap gap-1.5 mb-5">
                  @for (amenity of room.amenities.slice(0, 4); track amenity) {
                    <span class="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-full">{{ amenity }}</span>
                  }
                  @if (room.amenities.length > 4) {
                    <span class="bg-gold-100 text-gold-700 text-xs px-2 py-1 rounded-full font-medium">+{{ room.amenities.length - 4 }} more</span>
                  }
                </div>

                <a routerLink="/booking" [queryParams]="{ roomId: room._id }"
                   [class]="'block w-full text-center px-6 py-3 rounded-xl font-medium transition-all ' + (room.isBooked ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gold-600 text-white hover:bg-gold-700 shadow-md hover:shadow-lg')">
                  {{ room.isBooked ? 'Not Available' : 'Book Now' }}
                </a>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: `
    .text-gold-400 { color: #e6c455; }
    .text-gold-600 { color: #c5a028; }
    .text-gold-700 { color: #a58820; }
    .bg-gold-100 { background-color: rgba(212, 175, 55, 0.1); }
    .bg-gold-600 { background-color: #d4af37; }
    .bg-gold-700 { background-color: #b5952f; }
    .hover\\:bg-gold-600:hover { background-color: #d4af37; }
    .hover\\:bg-gold-700:hover { background-color: #b5952f; }
    .border-gold-600 { border-color: #d4af37; }
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `
})
export class Rooms implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/rooms';

  allRooms = signal<Room[]>([]);
  filteredRooms = signal<Room[]>([]);
  roomTypes = signal<string[]>([]);
  activeType = signal('All');
  hotelName = signal('');

  ngOnInit() {
    // Load room types for filter tabs
    this.http.get<string[]>(`${this.apiUrl}/types`).subscribe(types => {
      this.roomTypes.set(types.sort());
    });

    // Check for query params (hotelId from Hotels page "View Rooms")
    this.route.queryParams.subscribe(params => {
      const hotelId = params['hotelId'];
      if (hotelId) {
        this.loadRooms(hotelId);
      } else {
        this.loadRooms();
      }
    });
  }

  loadRooms(hotelId?: string) {
    let url = this.apiUrl;
    if (hotelId) url += `?hotel=${hotelId}`;

    this.http.get<Room[]>(url).subscribe(rooms => {
      this.allRooms.set(rooms);
      this.filteredRooms.set(rooms);
      this.activeType.set('All');

      // Set hotel name if filtering by hotel
      if (hotelId && rooms.length > 0 && rooms[0].hotel) {
        this.hotelName.set(`${rooms[0].hotel.name}, ${rooms[0].hotel.city}`);
      } else {
        this.hotelName.set('');
      }
    });
  }

  filterByType(type: string) {
    this.activeType.set(type);
    if (type === 'All') {
      this.filteredRooms.set(this.allRooms());
    } else {
      this.filteredRooms.set(this.allRooms().filter(r => r.type === type));
    }
  }
}
