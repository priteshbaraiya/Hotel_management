import { Component, signal, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
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
          The Royal <span class="text-gold-400">Hotel</span>
        </h1>
        <p class="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto drop-shadow-md text-gray-100">
          Experience the epitome of luxury and comfort in the heart of paradise. Where every moment becomes a cherished memory.
        </p>
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
  `
})
export class Home implements OnInit, OnDestroy {
  sliderImages = signal([
    { url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070', title: 'Luxury Hotel Exterior' },
    { url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070', title: 'Presidential Suite' },
    { url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070', title: 'Infinity Pool' },
    { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2070', title: 'Night View' },
    { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070', title: 'Ocean View Room' }
  ]);

  currentSlide = signal(0);
  private intervalId: ReturnType<typeof setInterval> | null = null;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
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
