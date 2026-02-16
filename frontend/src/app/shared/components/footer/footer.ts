import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="bg-gray-900 dark:bg-black text-white py-12">
      <div class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-2xl font-serif mb-4 text-gold-500">The Royal Hotel</h3>
          <p class="text-gray-400">Experience luxury like never before. integration of comfort and elegance.</p>
        </div>
        <div>
          <h4 class="text-lg font-bold mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li><a routerLink="/" class="text-gray-400 hover:text-gold-500 transition">Home</a></li>
            <li><a routerLink="/rooms" class="text-gray-400 hover:text-gold-500 transition">Rooms</a></li>
            <li><a routerLink="/services" class="text-gray-400 hover:text-gold-500 transition">Services</a></li>
            <li><a routerLink="/booking" class="text-gray-400 hover:text-gold-500 transition">Book Now</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-lg font-bold mb-4">Contact</h4>
          <ul class="space-y-2 text-gray-400">
            <li><i class="fas fa-map-marker-alt mr-2"></i> 123 Luxury Ave, Paradise City</li>
            <li><i class="fas fa-phone mr-2"></i> +1 234 567 890</li>
            <li><i class="fas fa-envelope mr-2"></i> info@royalhotel.com</li>
          </ul>
        </div>
        <div>
          <h4 class="text-lg font-bold mb-4">Follow Us</h4>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-gold-500 transition"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="text-gray-400 hover:text-gold-500 transition"><i class="fab fa-instagram"></i></a>
            <a href="#" class="text-gray-400 hover:text-gold-500 transition"><i class="fab fa-twitter"></i></a>
          </div>
        </div>
      </div>
      <div class="text-center mt-8 pt-8 border-t border-gray-800 text-gray-500">
        &copy; 2026 The Royal Hotel. All rights reserved.
      </div>
    </footer>
  `,
  styles: `
    .text-gold-500 { color: #d4af37; }
    .bg-gray-900 { background-color: #1a1a1a; }
  `
})
export class Footer { }
