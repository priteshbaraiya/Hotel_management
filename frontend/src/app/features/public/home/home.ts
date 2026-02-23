import { Component, signal, ChangeDetectionStrategy, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HotelService, Hotel } from '../../../core/services/hotel.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Hero Section (Carousel) -->
    <section class="relative h-[90vh] flex items-center justify-center overflow-hidden">
      <!-- Background Images -->
      @for (image of sliderImages(); track $index) {
        <div class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
             [class.opacity-100]="$index === currentSlide()"
             [class.opacity-0]="$index !== currentSlide()">
          <img [src]="image.url" [alt]="image.title" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60"></div>
        </div>
      }

      <!-- Carousel Controls -->
      <button (click)="prevSlide()" class="absolute left-6 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition focus:outline-none" aria-label="Previous slide">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      <button (click)="nextSlide()" class="absolute right-6 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition focus:outline-none" aria-label="Next slide">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>

      <!-- Carousel Indicators -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        @for (image of sliderImages(); track $index) {
          <button (click)="goToSlide($index)" 
                  class="transition-all duration-300 focus:outline-none rounded-full"
                  [class]="$index === currentSlide() ? 'w-8 h-3 bg-gold-500' : 'w-3 h-3 bg-white/50 hover:bg-white'"
                  [attr.aria-label]="'Go to slide ' + ($index + 1)">
          </button>
        }
      </div>

      <!-- Content -->
      <div class="relative z-10 text-center text-white px-4 animate-fade-in-up max-w-4xl">
        <p class="text-gold-400 uppercase tracking-widest mb-4 font-medium">Welcome to Luxury</p>
        <h1 class="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight drop-shadow-lg">
          The Royal <span class="text-gold-400">Hotels</span>
        </h1>
        
        <!-- Search Bar -->
        <div class="max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20 shadow-2xl mb-8 flex items-center">
            <input 
              type="text" 
              [(ngModel)]="searchCity" 
              placeholder="Search by city (e.g. Mumbai, Goa, Delhi)..." 
              class="flex-grow bg-transparent border-none text-white placeholder-gray-300 px-6 py-3 focus:outline-none text-lg"
            >
            <button (click)="searchHotels()" class="bg-gold-600 hover:bg-gold-700 text-white px-8 py-3 rounded-full font-bold transition">
              Search
            </button>
        </div>

        <div class="flex flex-col md:flex-row gap-4 justify-center">
          <a routerLink="/booking" class="px-8 py-4 bg-gold-600 text-white rounded-full font-medium hover:bg-gold-700 transition transform hover:scale-105 shadow-lg text-lg">
            Book Your Stay
          </a>
          <a routerLink="/rooms" class="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-gray-900 transition transform hover:scale-105">
            Explore Rooms
          </a>
        </div>
      </div>
    </section>

    <!-- Explore Our Locations Section -->
    <section class="py-20 bg-white dark:bg-gray-950">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <p class="text-gold-600 uppercase tracking-widest mb-2 font-medium">Top Destinations</p>
          <h2 class="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">Explore Our Locations</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          @for (city of cities(); track city.name) {
            <a [routerLink]="['/hotels']" [queryParams]="{ city: city.name }" class="relative h-[480px] rounded-2xl overflow-hidden shadow-lg cursor-pointer group block border-2 border-transparent hover:border-gold-400 transition-all duration-500">
              <img [ngSrc]="city.image" [alt]="city.name" fill priority class="object-cover transform group-hover:scale-110 transition duration-700">
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              
              <div class="absolute bottom-0 left-0 p-8 w-full transform group-hover:translate-y-[-10px] transition-transform duration-500">
                <div class="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-widest mb-3">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>Top Rated</span>
                </div>
                <h3 class="text-3xl font-serif font-bold text-white mb-2">{{ city.name }}</h3>
                <p class="text-gray-300 text-sm mb-6 flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    {{ city.hotelsCount }}+ Luxury Hotels Available
                </p>
                <div class="flex gap-3">
                    <div class="flex-1 bg-gold-600 text-white text-center text-xs font-bold py-3 rounded-xl transition uppercase tracking-wider group-hover:bg-gold-700 shadow-lg">
                        View Hotels
                    </div>
                    <div class="flex-1 bg-white/10 backdrop-blur-md border border-white/30 text-white text-center text-xs font-bold py-3 rounded-xl transition uppercase tracking-wider hover:bg-white/20">
                        Book Stay
                    </div>
                </div>
              </div>
            </a>
          }
        </div>
      </div>
    </section>

    <!-- Hotels at Selection -->
    @if (targetHotels().length > 0) {
      <section id="hotels-results" class="py-20 bg-gray-50 dark:bg-gray-900">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">Featured Hotels in {{ currentFilter() || 'All Cities' }}</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @for (hotel of targetHotels(); track hotel._id) {
              <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition group flex flex-col h-full">
                <div class="h-64 overflow-hidden relative">
                  <img [src]="hotel.imagePath" [alt]="hotel.name" class="w-full h-full object-cover">
                  <div class="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <span class="text-gold-600 font-bold">{{ hotel.stars }}</span>
                    <i class="fas fa-star text-gold-500 text-xs"></i>
                  </div>
                </div>
                <div class="p-6 flex flex-col flex-grow">
                  <p class="text-gold-600 text-sm font-bold uppercase tracking-wider mb-2">{{ hotel.city }}</p>
                  <h3 class="text-2xl font-serif font-bold mb-3 dark:text-white">{{ hotel.name }}</h3>
                  <p class="text-gray-600 dark:text-gray-300 mb-6 flex-grow line-clamp-3">{{ hotel.description }}</p>
                  <div class="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-4 mt-auto">
                    <span class="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2">
                        <i class="fas fa-map-marker-alt text-gold-600"></i> {{ hotel.address }}
                    </span>
                    <a [routerLink]="['/rooms']" [queryParams]="{ hotelId: hotel._id }" class="text-gold-600 font-bold hover:text-gold-700">View Rooms</a>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </section>
    }

    <!-- Features Strip -->
    <section class="bg-gray-900 dark:bg-black py-6">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap justify-center gap-8 md:gap-16 text-white text-center">
          <div class="flex items-center gap-3">
            <i class="fas fa-award text-gold-500 text-2xl"></i>
            <span class="text-sm">5-Star Luxury</span>
          </div>
          <div class="flex items-center gap-3">
            <i class="fas fa-wifi text-gold-500 text-2xl"></i>
            <span class="text-sm">Free High-Speed WiFi</span>
          </div>
          <div class="flex items-center gap-3">
            <i class="fas fa-concierge-bell text-gold-500 text-2xl"></i>
            <span class="text-sm">24/7 Concierge</span>
          </div>
          <div class="flex items-center gap-3">
            <i class="fas fa-spa text-gold-500 text-2xl"></i>
            <span class="text-sm">World-Class Spa</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Preview -->
    <section class="py-20 bg-gray-50 dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <p class="text-gold-600 uppercase tracking-widest mb-2 font-medium">Our Services</p>
          <h2 class="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">World-Class Amenities</h2>
          <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Indulge in our premium amenities designed to provide you with an unforgettable experience.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Service 1 - Spa -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition group">
            <div class="h-56 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Spa" class="w-full h-full object-cover transform group-hover:scale-110 transition duration-500">
            </div>
            <div class="p-6 text-center">
              <div class="w-14 h-14 bg-gold-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-spa text-2xl text-gold-600"></i>
              </div>
              <h3 class="text-xl font-bold mb-2 dark:text-white">Luxury Spa</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">Rejuvenate your body and mind with our signature treatments and therapies.</p>
              <a routerLink="/services" class="text-gold-600 font-medium hover:text-gold-700 inline-flex items-center gap-2">
                Learn More <i class="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>

          <!-- Service 2 - Fine Dining -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition group">
            <div class="h-56 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Fine Dining" class="w-full h-full object-cover transform group-hover:scale-110 transition duration-500">
            </div>
            <div class="p-6 text-center">
              <div class="w-14 h-14 bg-gold-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-utensils text-2xl text-gold-600"></i>
              </div>
              <h3 class="text-xl font-bold mb-2 dark:text-white">Fine Dining</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">Savor exquisite culinary delights from our award-winning master chefs.</p>
              <a routerLink="/services" class="text-gold-600 font-medium hover:text-gold-700 inline-flex items-center gap-2">
                Learn More <i class="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>

          <!-- Service 3 - Infinity Pool -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition group">
            <div class="h-56 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800" alt="Infinity Pool" class="w-full h-full object-cover transform group-hover:scale-110 transition duration-500">
            </div>
            <div class="p-6 text-center">
              <div class="w-14 h-14 bg-gold-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-swimming-pool text-2xl text-gold-600"></i>
              </div>
              <h3 class="text-xl font-bold mb-2 dark:text-white">Infinity Pool</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">Relax by our stunning infinity pool with panoramic ocean views.</p>
              <a routerLink="/services" class="text-gold-600 font-medium hover:text-gold-700 inline-flex items-center gap-2">
                Learn More <i class="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Preview -->
    <section class="py-20 bg-white dark:bg-gray-950">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <p class="text-gold-600 uppercase tracking-widest mb-2 font-medium">Gallery</p>
          <h2 class="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">Explore Our Hotel</h2>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="col-span-2 row-span-2 rounded-2xl overflow-hidden shadow-lg">
            <img src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800" alt="Lobby" class="w-full h-full object-cover hover:scale-105 transition duration-500">
          </div>
          <div class="rounded-2xl overflow-hidden shadow-lg">
            <img src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=400" alt="Suite" class="w-full h-48 object-cover hover:scale-105 transition duration-500">
          </div>
          <div class="rounded-2xl overflow-hidden shadow-lg">
            <img src="https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=400" alt="Pool" class="w-full h-48 object-cover hover:scale-105 transition duration-500">
          </div>
          <div class="rounded-2xl overflow-hidden shadow-lg">
            <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=400" alt="Restaurant" class="w-full h-48 object-cover hover:scale-105 transition duration-500">
          </div>
          <div class="rounded-2xl overflow-hidden shadow-lg">
            <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=400" alt="Spa" class="w-full h-48 object-cover hover:scale-105 transition duration-500">
          </div>
        </div>
        
        <div class="text-center mt-10">
          <a routerLink="/gallery" class="inline-flex items-center gap-2 px-8 py-3 border-2 border-gold-600 text-gold-600 rounded-full font-medium hover:bg-gold-600 hover:text-white transition">
            View Full Gallery <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>

    <!-- Special Offers CTA -->
    <section class="py-20 bg-gradient-to-r from-gray-900 to-gray-800 relative overflow-hidden">
      <div class="absolute inset-0 opacity-20">
        <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1920" alt="Background" class="w-full h-full object-cover">
      </div>
      <div class="container mx-auto px-4 relative z-10 text-center">
        <p class="text-gold-400 uppercase tracking-widest mb-2 font-medium">Special Deals</p>
        <h2 class="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Exclusive Offers Await</h2>
        <p class="text-gray-300 max-w-2xl mx-auto mb-8 text-lg">
          Take advantage of our special packages and save up to 38% on your dream vacation.
        </p>
        <a routerLink="/offers" class="inline-flex items-center gap-2 px-8 py-4 bg-gold-600 text-white rounded-full font-medium hover:bg-gold-700 transition shadow-lg text-lg">
          View All Offers <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    </section>
  `,
  styles: `
    .text-gold-400 { color: #e6c455; }
    .text-gold-500 { color: #d4af37; }
    .text-gold-600 { color: #c5a028; }
    .bg-gold-500 { background-color: #d4af37; }
    .bg-gold-600 { background-color: #d4af37; }
    .bg-gold-100 { background-color: rgba(212, 175, 55, 0.1); }
    .bg-gold-700 { background-color: #b5952f; }
    .border-gold-600 { border-color: #d4af37; }
    .animate-fade-in-up { animation: fadeInUp 0.8s ease-out; }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `
})
export class Home implements OnInit, OnDestroy {
  private hotelService = inject(HotelService);

  sliderImages = signal([
    { url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070', title: 'Luxury Hotel Exterior' },
    { url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070', title: 'Presidential Suite' },
    { url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070', title: 'Infinity Pool' },
    { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2070', title: 'Night View' },
    { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070', title: 'Ocean View Room' }
  ]);

  cities = signal([
    { name: 'Mumbai', hotelsCount: 25, image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=1600' },
    { name: 'Goa', hotelsCount: 25, image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1600' },
    { name: 'Delhi', hotelsCount: 25, image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1600' },
    { name: 'Bangalore', hotelsCount: 25, image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1600' }
  ]);

  currentSlide = signal(0);
  searchCity = '';
  currentFilter = signal('');
  targetHotels = signal<Hotel[]>([]);
  private intervalId: ReturnType<typeof setInterval> | null = null;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000);
    this.loadAllHotels();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  loadAllHotels() {
    this.hotelService.getHotels().subscribe(hotels => {
      this.targetHotels.set(hotels.slice(0, 3)); // Featured
    });
  }

  searchHotels() {
    if (!this.searchCity.trim()) return;
    this.filterByCity(this.searchCity);
  }

  filterByCity(city: string) {
    this.currentFilter.set(city);
    this.hotelService.getHotels(city).subscribe(hotels => {
      this.targetHotels.set(hotels);
      const resultsSection = document.getElementById('hotels-results');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  nextSlide() {
    this.currentSlide.update(v => (v + 1) % this.sliderImages().length);
  }

  prevSlide() {
    this.currentSlide.update(v => (v - 1 + this.sliderImages().length) % this.sliderImages().length);
  }

  goToSlide(index: number) {
    this.currentSlide.set(index);
  }
}
