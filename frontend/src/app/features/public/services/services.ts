import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-services',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-gray-50 dark:bg-gray-950 min-h-screen">
      <!-- Hero Banner -->
      <div class="relative h-72 bg-gradient-to-r from-gray-900 to-gray-800 flex items-center justify-center overflow-hidden">
        <div class="absolute inset-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070" alt="Services" class="w-full h-full object-cover">
        </div>
        <div class="relative text-center text-white">
          <h1 class="text-4xl md:text-5xl font-serif font-bold mb-2">Our Premium Services</h1>
          <p class="text-gray-300 text-lg">Discover the range of exclusive services designed for your comfort</p>
        </div>
      </div>
      
      <div class="container mx-auto px-4 py-16">
        <div class="space-y-20">
          <!-- Service 1 - Spa & Wellness -->
          <div class="flex flex-col md:flex-row items-center gap-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300">
            <div class="w-full md:w-1/2 h-72 md:h-96">
              <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Spa & Wellness" class="w-full h-full object-cover">
            </div>
            <div class="w-full md:w-1/2 p-8 md:p-12">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 bg-gold-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <i class="fas fa-spa text-2xl text-gold-600"></i>
                </div>
                <h3 class="text-3xl font-serif font-bold text-gray-900 dark:text-white">Spa & Wellness</h3>
              </div>
              <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Immerse yourself in tranquility at our world-class spa. Offering a comprehensive menu of treatments, 
                massages, and therapies designed to rejuvenate your mind, body, and soul. 
                Experience our signature aromatherapy and hot stone massages.
              </p>
              <ul class="space-y-3 mb-8">
                <li class="flex items-center text-gray-700 dark:text-gray-300"><i class="fas fa-check text-gold-600 mr-3"></i> Specialized Facials & Skincare</li>
                <li class="flex items-center text-gray-700 dark:text-gray-300"><i class="fas fa-check text-gold-600 mr-3"></i> Deep Tissue & Swedish Massage</li>
                <li class="flex items-center text-gray-700 dark:text-gray-300"><i class="fas fa-check text-gold-600 mr-3"></i> Sauna & Steam Room Access</li>
                <li class="flex items-center text-gray-700 dark:text-gray-300"><i class="fas fa-check text-gold-600 mr-3"></i> Couples Treatment Rooms</li>
              </ul>
              <p class="text-gold-600 font-bold text-lg">Starting from ₹12,499 per session</p>
            </div>
          </div>

          <!-- Service 2 - Fine Dining -->
          <div class="flex flex-col md:flex-row-reverse items-center gap-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300">
            <div class="w-full md:w-1/2 h-72 md:h-96">
              <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Fine Dining" class="w-full h-full object-cover">
            </div>
            <div class="w-full md:w-1/2 p-8 md:p-12">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 bg-gold-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <i class="fas fa-utensils text-2xl text-gold-600"></i>
                </div>
                <h3 class="text-3xl font-serif font-bold text-gray-900 dark:text-white">Fine Dining</h3>
              </div>
              <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Savor exquisite culinary delights from our master chefs. Our award-winning restaurants offer 
                a gastronomic journey featuring local delicacies and international cuisine. 
                Experience romantic candlelit dinners or casual poolside dining with breathtaking views.
              </p>
              <ul class="space-y-3 mb-8">
                <li class="flex items-center text-gray-700 dark:text-gray-300"><i class="fas fa-check text-gold-600 mr-3"></i> Michelin-Star Trained Chefs</li>
                <li class="flex items-center text-gray-700 dark:text-gray-300"><i class="fas fa-check text-gold-600 mr-3"></i> Fresh & Organic Ingredients</li>
                <li class="flex items-center text-gray-700 dark:text-gray-300"><i class="fas fa-check text-gold-600 mr-3"></i> Extensive Wine Collection</li>
                <li class="flex items-center text-gray-700 dark:text-gray-300"><i class="fas fa-check text-gold-600 mr-3"></i> 24/7 In-Room Dining Service</li>
              </ul>
              <p class="text-gold-600 font-bold text-lg">Tasting Menu from ₹16,599 per person</p>
            </div>
          </div>

          <!-- Service 3 - Infinity Pool -->
          <div class="flex flex-col md:flex-row items-center gap-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300">
            <div class="w-full md:w-1/2 h-72 md:h-96">
              <img src="https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800" alt="Infinity Pool" class="w-full h-full object-cover">
            </div>
            <div class="w-full md:w-1/2 p-8 md:p-12">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 bg-gold-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <i class="fas fa-swimming-pool text-2xl text-gold-600"></i>
                </div>
                <h3 class="text-3xl font-serif font-bold text-gray-900 dark:text-white">Infinity Pool</h3>
              </div>
              <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Relax by our stunning infinity pool with panoramic ocean views. Our rooftop pool area 
                offers private cabanas, poolside cocktail service, and breathtaking sunset views. 
                The perfect spot to unwind and soak in the tropical atmosphere.
              </p>
              <ul class="space-y-3 mb-8">
                <li class="flex items-center text-gray-700 dark:text-gray-300"><i class="fas fa-check text-gold-600 mr-3"></i> Panoramic Ocean Views</li>
                <li class="flex items-center text-gray-700 dark:text-gray-300"><i class="fas fa-check text-gold-600 mr-3"></i> Private Cabanas Available</li>
                <li class="flex items-center text-gray-700 dark:text-gray-300"><i class="fas fa-check text-gold-600 mr-3"></i> Poolside Bar & Cocktails</li>
                <li class="flex items-center text-gray-700 dark:text-gray-300"><i class="fas fa-check text-gold-600 mr-3"></i> Complimentary Towel Service</li>
              </ul>
              <p class="text-gold-600 font-bold text-lg">Cabana Rental from ₹8,299 per day</p>
            </div>
          </div>

          <!-- Service 4 - Concierge -->
          <div class="flex flex-col md:flex-row-reverse items-center gap-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300">
            <div class="w-full md:w-1/2 h-72 md:h-96">
              <img src="https://images.unsplash.com/photo-1560662105-57f8ad6ae2d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Concierge Services" class="w-full h-full object-cover">
            </div>
            <div class="w-full md:w-1/2 p-8 md:p-12">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 bg-gold-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <i class="fas fa-concierge-bell text-2xl text-gold-600"></i>
                </div>
                <h3 class="text-3xl font-serif font-bold text-gray-900 dark:text-white">Concierge Services</h3>
              </div>
              <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Our dedicated concierge team is at your service 24/7. Whether you need travel arrangements, 
                ticket bookings for local events, or personalized city tours, we are here to ensure 
                your stay is seamless and memorable.
              </p>
              <ul class="space-y-3 mb-8">
                <li class="flex items-center text-gray-700 dark:text-gray-300"><i class="fas fa-check text-gold-600 mr-3"></i> 24/7 Guest Assistance</li>
                <li class="flex items-center text-gray-700 dark:text-gray-300"><i class="fas fa-check text-gold-600 mr-3"></i> Private Tours & Excursions</li>
                <li class="flex items-center text-gray-700 dark:text-gray-300"><i class="fas fa-check text-gold-600 mr-3"></i> Airport Transfer Service</li>
                <li class="flex items-center text-gray-700 dark:text-gray-300"><i class="fas fa-check text-gold-600 mr-3"></i> Event & Restaurant Bookings</li>
              </ul>
              <p class="text-gold-600 font-bold text-lg">Complimentary for All Guests</p>
            </div>
          </div>

          <!-- Service 5 - Fitness Center -->
          <div class="flex flex-col md:flex-row items-center gap-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300">
            <div class="w-full md:w-1/2 h-72 md:h-96">
              <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800" alt="Fitness Center" class="w-full h-full object-cover">
            </div>
            <div class="w-full md:w-1/2 p-8 md:p-12">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 bg-gold-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <i class="fas fa-dumbbell text-2xl text-gold-600"></i>
                </div>
                <h3 class="text-3xl font-serif font-bold text-gray-900 dark:text-white">Fitness Center</h3>
              </div>
              <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Stay active during your stay at our state-of-the-art fitness center. 
                Equipped with the latest cardio machines, free weights, and personal training services. 
                Join our yoga and meditation classes overlooking the ocean.
              </p>
              <ul class="space-y-3 mb-8">
                <li class="flex items-center text-gray-700 dark:text-gray-300"><i class="fas fa-check text-gold-600 mr-3"></i> Modern Gym Equipment</li>
                <li class="flex items-center text-gray-700 dark:text-gray-300"><i class="fas fa-check text-gold-600 mr-3"></i> Personal Training Sessions</li>
                <li class="flex items-center text-gray-700 dark:text-gray-300"><i class="fas fa-check text-gold-600 mr-3"></i> Daily Yoga Classes</li>
                <li class="flex items-center text-gray-700 dark:text-gray-300"><i class="fas fa-check text-gold-600 mr-3"></i> 24-Hour Access</li>
              </ul>
              <p class="text-gold-600 font-bold text-lg">Complimentary for All Guests</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .text-gold-600 { color: #d4af37; }
    .bg-gold-100 { background-color: rgba(212, 175, 55, 0.1); }
  `
})
export class Services { }
