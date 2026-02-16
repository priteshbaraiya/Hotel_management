import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';

interface GalleryImage {
  url: string;
  title: string;
  description: string;
  category: 'rooms' | 'dining' | 'pool-spa' | 'events';
}

@Component({
  selector: 'app-gallery',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
      <!-- Hero Banner -->
      <div class="relative h-64 bg-gradient-to-r from-gray-900 to-gray-800 flex items-center justify-center">
        <div class="absolute inset-0 opacity-30">
          <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070" alt="Gallery" class="w-full h-full object-cover">
        </div>
        <div class="relative text-center text-white">
          <h1 class="text-4xl md:text-5xl font-serif font-bold mb-2">Our Gallery</h1>
          <p class="text-gray-300">Explore the beauty of The Royal Hotel</p>
        </div>
      </div>

      <div class="container mx-auto px-4 py-16">
        <!-- Filter Tabs -->
        <div class="flex flex-wrap justify-center gap-4 mb-12">
          <button 
            (click)="setFilter('all')" 
            [class]="activeFilter() === 'all' ? 'px-6 py-2 bg-gold-600 text-white rounded-full font-medium shadow-lg' : 'px-6 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full font-medium hover:bg-gold-50 dark:hover:bg-gray-700 transition shadow'">
            All
          </button>
          <button 
            (click)="setFilter('rooms')" 
            [class]="activeFilter() === 'rooms' ? 'px-6 py-2 bg-gold-600 text-white rounded-full font-medium shadow-lg' : 'px-6 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full font-medium hover:bg-gold-50 dark:hover:bg-gray-700 transition shadow'">
            Rooms
          </button>
          <button 
            (click)="setFilter('dining')" 
            [class]="activeFilter() === 'dining' ? 'px-6 py-2 bg-gold-600 text-white rounded-full font-medium shadow-lg' : 'px-6 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full font-medium hover:bg-gold-50 dark:hover:bg-gray-700 transition shadow'">
            Dining
          </button>
          <button 
            (click)="setFilter('pool-spa')" 
            [class]="activeFilter() === 'pool-spa' ? 'px-6 py-2 bg-gold-600 text-white rounded-full font-medium shadow-lg' : 'px-6 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full font-medium hover:bg-gold-50 dark:hover:bg-gray-700 transition shadow'">
            Pool & Spa
          </button>
          <button 
            (click)="setFilter('events')" 
            [class]="activeFilter() === 'events' ? 'px-6 py-2 bg-gold-600 text-white rounded-full font-medium shadow-lg' : 'px-6 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full font-medium hover:bg-gold-50 dark:hover:bg-gray-700 transition shadow'">
            Events
          </button>
        </div>

        <!-- Gallery Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (image of filteredImages(); track image.url) {
            <div class="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer" [class.md:col-span-2]="image.title === 'Grand Lobby'">
              <img [src]="image.url" [alt]="image.title" 
                   class="w-full h-72 object-cover transform group-hover:scale-110 transition duration-500">
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition">
                <div class="absolute bottom-4 left-4 text-white">
                  <h3 class="text-lg font-bold">{{ image.title }}</h3>
                  <p class="text-sm text-gray-300">{{ image.description }}</p>
                </div>
              </div>
            </div>
          }
        </div>

        @if (filteredImages().length === 0) {
          <div class="text-center py-16">
            <p class="text-gray-500 dark:text-gray-400 text-lg">No images found for this category.</p>
          </div>
        }

        <!-- CTA -->
        <div class="text-center mt-16">
          <a routerLink="/booking" class="inline-block px-8 py-4 bg-gold-600 text-white rounded-full font-medium hover:bg-gold-700 transition shadow-lg hover:shadow-xl transform hover:scale-105">
            Book Your Stay Now
          </a>
        </div>
      </div>
    </div>
  `,
  styles: `
    .bg-gold-600 { background-color: #d4af37; }
    .bg-gold-700 { background-color: #b5952f; }
    .hover\\:bg-gold-50:hover { background-color: #fdfcfa; }
  `
})
export class Gallery {
  activeFilter = signal<'all' | 'rooms' | 'dining' | 'pool-spa' | 'events'>('all');

  images = signal<GalleryImage[]>([
    { url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800', title: 'Presidential Suite', description: 'Luxurious accommodation', category: 'rooms' },
    { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800', title: 'Ocean View Room', description: 'Wake up to paradise', category: 'rooms' },
    { url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800', title: 'Deluxe Room', description: 'Modern comfort', category: 'rooms' },
    { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800', title: 'Hotel Exterior', description: 'Stunning architecture', category: 'rooms' },
    { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800', title: 'Fine Dining', description: 'Gourmet cuisine', category: 'dining' },
    { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800', title: 'Restaurant Interior', description: 'Elegant ambiance', category: 'dining' },
    { url: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=800', title: 'Breakfast Buffet', description: 'Start your day right', category: 'dining' },
    { url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800', title: 'Infinity Pool', description: 'Panoramic ocean views', category: 'pool-spa' },
    { url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800', title: 'Luxury Spa', description: 'Relaxation & wellness', category: 'pool-spa' },
    { url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800', title: 'Spa Treatment', description: 'Rejuvenate yourself', category: 'pool-spa' },
    { url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1200', title: 'Grand Lobby', description: 'Elegant welcome', category: 'events' },
    { url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800', title: 'Wedding Venue', description: 'Your special day', category: 'events' },
    { url: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=800', title: 'Sunset Terrace', description: 'Breathtaking views', category: 'events' },
    { url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800', title: 'Conference Hall', description: 'Business meetings', category: 'events' }
  ]);

  filteredImages = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'all') {
      return this.images();
    }
    return this.images().filter(img => img.category === filter);
  });

  setFilter(filter: 'all' | 'rooms' | 'dining' | 'pool-spa' | 'events') {
    this.activeFilter.set(filter);
  }
}
