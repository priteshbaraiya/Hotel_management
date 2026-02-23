import { Component, signal, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HotelService, Hotel } from '../../../core/services/hotel.service';

@Component({
  selector: 'app-hotels',
  imports: [RouterLink, FormsModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Hero Banner -->
    <section class="relative h-[40vh] flex items-center justify-center overflow-hidden">
      <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070" alt="Hotels" class="absolute inset-0 w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70"></div>
      <div class="relative z-10 text-center text-white">
        <p class="text-gold-400 uppercase tracking-widest mb-2 font-medium">Our Collection</p>
        <h1 class="text-4xl md:text-6xl font-serif font-bold">Luxury Hotels</h1>
      </div>
    </section>

    <!-- Filter Bar -->
    <section class="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-20 z-30">
      <div class="container mx-auto px-4 py-4">
        <div class="flex flex-wrap items-center gap-4">
          <div class="flex-1 min-w-[200px]">
            <input
              type="text"
              [(ngModel)]="searchQuery"
              (keyup.enter)="applyFilters()"
              placeholder="Search by city or hotel name..."
              class="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold-500 text-sm"
            >
          </div>
          <div class="flex gap-2 flex-wrap">
            <button
              (click)="filterCity('')"
              [class]="'px-4 py-2 rounded-full text-sm font-medium transition-all ' + (activeCity() === '' ? 'bg-gold-600 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700')"
            >All</button>
            @for (city of allCities; track city) {
              <button
                (click)="filterCity(city)"
                [class]="'px-4 py-2 rounded-full text-sm font-medium transition-all ' + (activeCity() === city ? 'bg-gold-600 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700')"
              >{{ city }}</button>
            }
          </div>
        </div>
      </div>
    </section>

    <!-- Hotels Grid -->
    <section class="py-16 bg-gray-50 dark:bg-gray-900 min-h-[60vh]">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center mb-8">
          <p class="text-gray-600 dark:text-gray-400">
            Showing <span class="font-bold text-gold-600">{{ filteredHotels().length }}</span> hotels
            @if (activeCity()) {
              in <span class="font-bold text-gold-600">{{ activeCity() }}</span>
            }
          </p>
        </div>

        @if (filteredHotels().length === 0) {
          <div class="text-center py-20">
            <i class="fas fa-hotel text-5xl text-gray-300 mb-4"></i>
            <h3 class="text-xl font-semibold text-gray-500 dark:text-gray-400">No hotels found</h3>
            <p class="text-gray-400 mt-2">Try a different city or search term</p>
          </div>
        }

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          @for (hotel of filteredHotels(); track hotel._id) {
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col h-full hover:-translate-y-1">
              <div class="h-52 overflow-hidden relative">
                <img [src]="hotel.imagePath" [alt]="hotel.name" class="w-full h-full object-cover transform group-hover:scale-110 transition duration-500">
                <div class="absolute top-3 right-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <span class="text-gold-600 font-bold text-sm">{{ hotel.stars }}</span>
                  <svg class="w-3.5 h-3.5 text-gold-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                </div>
                <div class="absolute top-3 left-3 bg-gold-600 text-white px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {{ hotel.city }}
                </div>
              </div>
              <div class="p-5 flex flex-col flex-grow">
                <h3 class="text-lg font-serif font-bold mb-1 dark:text-white group-hover:text-gold-600 transition-colors">{{ hotel.name }}</h3>
                <p class="text-gray-500 dark:text-gray-400 text-xs flex items-center gap-1 mb-2">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/></svg>
                  {{ hotel.address }}
                </p>
                <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow line-clamp-2">{{ hotel.description }}</p>
                <a [routerLink]="['/rooms']" [queryParams]="{ hotelId: hotel._id }" class="block text-center bg-gold-600 hover:bg-gold-700 text-white py-2 rounded-xl font-medium text-sm transition-colors">
                  View Rooms
                </a>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .text-gold-400 { color: #e6c455; }
    .text-gold-500 { color: #d4af37; }
    .text-gold-600 { color: #c5a028; }
    .bg-gold-500 { background-color: #d4af37; }
    .bg-gold-600 { background-color: #d4af37; }
    .bg-gold-700 { background-color: #b5952f; }
    .hover\\:bg-gold-700:hover { background-color: #b5952f; }
    .border-gold-600 { border-color: #d4af37; }
    .focus\\:ring-gold-500:focus { --tw-ring-color: #d4af37; }
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `
})
export class Hotels implements OnInit {
  private route = inject(ActivatedRoute);
  private hotelService = inject(HotelService);

  allHotels = signal<Hotel[]>([]);
  filteredHotels = signal<Hotel[]>([]);
  activeCity = signal('');
  searchQuery = '';

  allCities = ['Mumbai', 'Delhi', 'Bangalore', 'Goa', 'Jaipur', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Udaipur', 'Kochi', 'Shimla', 'Mussoorie', 'Agra', 'Varanasi'];

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const city = params['city'] || '';
      this.activeCity.set(city);
      this.loadHotels(city);
    });
  }

  loadHotels(city: string) {
    this.hotelService.getHotels(city || undefined).subscribe(hotels => {
      if (city) {
        this.filteredHotels.set(hotels);
      } else {
        this.allHotels.set(hotels);
        this.filteredHotels.set(hotels);
      }
    });
  }

  filterCity(city: string) {
    this.activeCity.set(city);
    this.searchQuery = '';
    this.loadHotels(city);
  }

  applyFilters() {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) {
      this.loadHotels(this.activeCity());
      return;
    }
    this.activeCity.set('');
    this.hotelService.getHotels().subscribe(hotels => {
      const filtered = hotels.filter(h =>
        h.name.toLowerCase().includes(q) ||
        h.city.toLowerCase().includes(q) ||
        h.address.toLowerCase().includes(q)
      );
      this.filteredHotels.set(filtered);
    });
  }
}
