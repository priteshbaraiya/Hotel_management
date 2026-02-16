import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-offers',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
      <!-- Hero Banner -->
      <div class="relative h-64 bg-gradient-to-r from-gray-900 to-gray-800 flex items-center justify-center overflow-hidden">
        <div class="absolute inset-0 opacity-30">
          <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070" alt="Offers" class="w-full h-full object-cover">
        </div>
        <div class="relative text-center text-white">
          <h1 class="text-4xl md:text-5xl font-serif font-bold mb-2">Special Offers</h1>
          <p class="text-gray-300">Exclusive deals for an unforgettable stay</p>
        </div>
      </div>

      <div class="container mx-auto px-4 py-16">
        <!-- Featured Offer -->
        <div class="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden shadow-2xl border border-gold-200 dark:border-gray-700">
          <div class="absolute top-0 right-0 w-64 h-64 bg-gold-50 dark:bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div class="absolute bottom-0 left-0 w-48 h-48 bg-gold-50 dark:bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          <div class="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div class="flex-1">
              <span class="inline-block px-4 py-1 bg-gold-100 dark:bg-gray-700 text-gold-800 dark:text-gold-400 rounded-full text-sm font-medium mb-4">Limited Time</span>
              <h2 class="text-3xl md:text-4xl font-serif font-bold mb-4 text-gold-700 dark:text-white">Weekend Getaway Package</h2>
              <p class="text-gray-600 dark:text-gray-300 mb-6 text-lg">Enjoy 2 nights stay with complimentary breakfast, spa treatment, and airport transfer. Perfect for a romantic escape.</p>
              <div class="flex items-center gap-4 mb-6 flex-wrap">
                <div class="flex flex-col">
                  <span class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Deal Price</span>
                  <span class="text-5xl font-bold text-gold-600">₹41,499</span>
                </div>
                <div class="flex flex-col h-full justify-end pb-2">
                  <span class="text-lg line-through text-gray-400 mb-1">₹66,499</span>
                </div>
                <div class="ml-2">
                  <span class="px-4 py-2 bg-red-600 text-white text-xl font-bold rounded-lg shadow-xl border border-red-400 animate-pulse">
                    38% OFF
                  </span>
                </div>
              </div>
              <a routerLink="/booking" class="inline-block px-8 py-3 bg-gold-600 text-white rounded-full font-bold hover:bg-gold-700 transition shadow-lg">
                Book Now
              </a>
            </div>
            <div class="w-full md:w-1/3">
              <img src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=400" alt="Weekend Getaway" 
                   class="w-full h-64 object-cover rounded-2xl shadow-2xl">
            </div>
          </div>
        </div>

        <!-- Offers Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Offer 1 -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition">
            <div class="relative h-48 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600" alt="Spa Package" 
                   class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
              <div class="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">25% OFF</div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Spa & Wellness Retreat</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">Full day spa access with 2 signature treatments and healthy lunch.</p>
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-2xl font-bold text-gold-600">₹16,499</span>
                  <span class="text-sm text-gray-400 line-through ml-2">₹21,999</span>
                </div>
                <a routerLink="/booking" class="px-4 py-2 bg-gold-600 text-white rounded-full text-sm font-medium hover:bg-gold-700 transition">
                  Book Now
                </a>
              </div>
            </div>
          </div>

          <!-- Offer 2 -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition">
            <div class="relative h-48 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=600" alt="Dining Package" 
                   class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
              <div class="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full">NEW</div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Gourmet Dinner Experience</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">7-course tasting menu with wine pairing for two at our rooftop restaurant.</p>
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-2xl font-bold text-gold-600">₹28,999</span>
                  <span class="text-sm text-gray-400 ml-2">per couple</span>
                </div>
                <a routerLink="/booking" class="px-4 py-2 bg-gold-600 text-white rounded-full text-sm font-medium hover:bg-gold-700 transition">
                  Book Now
                </a>
              </div>
            </div>
          </div>

          <!-- Offer 3 -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition">
            <div class="relative h-48 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=600" alt="Extended Stay" 
                   class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
              <div class="absolute top-4 right-4 px-3 py-1 bg-purple-500 text-white text-sm font-bold rounded-full">POPULAR</div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Stay 5, Pay 4</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">Extended stay offer - Book 5 nights and get the 5th night completely free!</p>
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-2xl font-bold text-gold-600">20% OFF</span>
                </div>
                <a routerLink="/booking" class="px-4 py-2 bg-gold-600 text-white rounded-full text-sm font-medium hover:bg-gold-700 transition">
                  Book Now
                </a>
              </div>
            </div>
          </div>

          <!-- Offer 4 -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition">
            <div class="relative h-48 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=600" alt="Pool Package" 
                   class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
              <div class="absolute top-4 right-4 px-3 py-1 bg-blue-500 text-white text-sm font-bold rounded-full">SUMMER</div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Pool & Cabana Day</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">Private cabana access with infinity pool, cocktails, and light bites included.</p>
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-2xl font-bold text-gold-600">₹12,399</span>
                  <span class="text-sm text-gray-400 ml-2">per person</span>
                </div>
                <a routerLink="/booking" class="px-4 py-2 bg-gold-600 text-white rounded-full text-sm font-medium hover:bg-gold-700 transition">
                  Book Now
                </a>
              </div>
            </div>
          </div>

          <!-- Offer 5 -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition">
            <div class="relative h-48 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600" alt="Honeymoon" 
                   class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
              <div class="absolute top-4 right-4 px-3 py-1 bg-pink-500 text-white text-sm font-bold rounded-full">ROMANTIC</div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Honeymoon Suite</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">3 nights in our Presidential Suite with champagne, flowers & private dinner.</p>
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-2xl font-bold text-gold-600">₹1,07,999</span>
                </div>
                <a routerLink="/booking" class="px-4 py-2 bg-gold-600 text-white rounded-full text-sm font-medium hover:bg-gold-700 transition">
                  Book Now
                </a>
              </div>
            </div>
          </div>

          <!-- Offer 6 -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition">
            <div class="relative h-48 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=600" alt="Business" 
                   class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
              <div class="absolute top-4 right-4 px-3 py-1 bg-gray-700 text-white text-sm font-bold rounded-full">BUSINESS</div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Business Traveler</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">Executive room with meeting room access, breakfast, and airport transfer.</p>
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-2xl font-bold text-gold-600">₹24,799</span>
                  <span class="text-sm text-gray-400 ml-2">per night</span>
                </div>
                <a routerLink="/booking" class="px-4 py-2 bg-gold-600 text-white rounded-full text-sm font-medium hover:bg-gold-700 transition">
                  Book Now
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Terms -->
        <div class="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>* All offers are subject to availability. Terms and conditions apply. Prices may vary based on season.</p>
        </div>
      </div>
    </div>
  `,
  styles: `
    .bg-gold-50 { background-color: #fdfcf5; }
    .bg-gold-100 { background-color: #f9f4d8; }
    .bg-gold-200 { background-color: #efe3a7; }
    .bg-gold-600 { background-color: #d4af37; }
    .bg-gold-700 { background-color: #b5952f; }
    .from-gold-600 { --tw-gradient-from: #d4af37; }
    .to-gold-700 { --tw-gradient-to: #b5952f; }
    .text-gold-600 { color: #d4af37; }
    .text-gold-700 { color: #b5952f; }
    .text-gold-800 { color: #9a7d25; }
    .border-gold-200 { border-color: #efe3a7; }
  `
})
export class Offers { }
