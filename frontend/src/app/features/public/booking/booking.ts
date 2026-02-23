import { Component, inject, signal, computed, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BookingService } from '../../../core/services/booking.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

interface RoomOption {
  _id: string;
  title: string;
  type: string;
  price: number;
  guests: number;
  size: number;
  hotel?: { _id: string; name: string; city: string };
}

@Component({
  selector: 'app-booking',
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="booking-page">
      <div class="booking-container">
        <div class="booking-card">
          <!-- Header -->
          <div class="booking-header">
            <h2>Book Your Stay</h2>
            <p>Secure your reservation at The Royal Hotels.</p>
            @if (!successMessage()) {
              <div class="step-indicator">
                <div class="step" [class.active]="currentStep() === 1" [class.completed]="currentStep() === 2">
                  <div class="step-circle">
                    @if (currentStep() === 2) {
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    } @else {
                      1
                    }
                  </div>
                  <span class="step-label">Booking Details</span>
                </div>
                <div class="step-line" [class.active]="currentStep() === 2"></div>
                <div class="step" [class.active]="currentStep() === 2">
                  <div class="step-circle">2</div>
                  <span class="step-label">Payment</span>
                </div>
              </div>
            }
          </div>

          @if (successMessage()) {
            <!-- Success State -->
            <div class="success-section">
              <div class="success-icon-wrap">
                <svg class="success-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              </div>
              <div class="success-message">{{ successMessage() }}</div>
              <button (click)="resetForm()" class="btn btn-gold">Book Another Room</button>
            </div>
          } @else if (currentStep() === 1) {
            <!-- STEP 1: Booking Details -->
            <form [formGroup]="bookingForm" (ngSubmit)="proceedToPayment()" class="booking-form">
              @if (errorMessage()) {
                <div class="error-banner" role="alert">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
                  {{ errorMessage() }}
                </div>
              }

              <div class="form-grid">
                <div class="form-group">
                  <label for="checkIn">Check-in Date</label>
                  <input type="date" id="checkIn" formControlName="checkIn" [min]="today">
                </div>
                <div class="form-group">
                  <label for="checkOut">Check-out Date</label>
                  <input type="date" id="checkOut" formControlName="checkOut" [min]="bookingForm.value.checkIn || today">
                </div>
              </div>

              <div class="form-grid">
                <div class="form-group">
                  <label for="location">Location / City</label>
                  <select id="location" formControlName="location" (change)="onCityChange()">
                    <option value="" disabled>Select a city</option>
                    @for (city of cities; track city) {
                      <option [value]="city">{{ city }}</option>
                    }
                  </select>
                </div>

                <div class="form-group">
                  <label for="roomType">Room Type</label>
                  @if (!bookingForm.value.location) {
                    <div class="placeholder-field">← Please select a city first</div>
                  } @else {
                    <select id="roomType" formControlName="roomType" (change)="onRoomTypeChange()">
                      <option value="" disabled>Select a room ({{ filteredRoomOptions().length }} available)</option>
                      @for (room of filteredRoomOptions(); track room._id) {
                        <option [value]="room._id">{{ room.type }} — {{ room.title }} (₹{{ room.price.toLocaleString() }}/night)</option>
                      }
                    </select>
                  }
                </div>
              </div>

              @if (selectedRoom()) {
                <div class="room-details-card">
                  <div class="room-details-content">
                    <div>
                      <h4>{{ selectedRoom()!.title }}</h4>
                      <p class="room-meta">{{ selectedRoom()!.type }} • {{ selectedRoom()!.guests }} Guests • {{ selectedRoom()!.size }} sq.ft</p>
                      @if (selectedRoom()!.hotel) {
                        <p class="room-hotel">{{ selectedRoom()!.hotel!.name }}, {{ selectedRoom()!.hotel!.city }}</p>
                      }
                    </div>
                    <div class="room-price-block">
                      <p class="room-price">₹{{ selectedRoom()!.price.toLocaleString() }}</p>
                      <p class="room-price-label">per night</p>
                    </div>
                  </div>
                </div>
              }

              <div class="form-grid">
                <div class="form-group">
                  <label for="guests">Number of Guests</label>
                  <select id="guests" formControlName="guests">
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5 Guests</option>
                    <option value="6">6 Guests</option>
                  </select>
                </div>
              </div>

              <button type="submit" [disabled]="bookingForm.invalid" class="btn btn-gold btn-full">
                Proceed to Payment →
              </button>
            </form>
          } @else {
            <!-- STEP 2: Payment -->
            <div class="payment-section">
              @if (errorMessage()) {
                <div class="error-banner" role="alert">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
                  {{ errorMessage() }}
                </div>
              }

              <!-- Amount Summary -->
              <div class="amount-summary">
                <div class="amount-header">
                  <h3>Payment Summary</h3>
                </div>
                <div class="amount-details">
                  <div class="amount-row">
                    <span>Room</span>
                    <span>{{ selectedRoom()!.title }}</span>
                  </div>
                  <div class="amount-row">
                    <span>Price per night</span>
                    <span>₹{{ selectedRoom()!.price.toLocaleString() }}</span>
                  </div>
                  <div class="amount-row">
                    <span>Number of nights</span>
                    <span>{{ numberOfNights() }}</span>
                  </div>
                  <div class="amount-row amount-total">
                    <span>Total Amount</span>
                    <span>₹{{ totalAmount().toLocaleString() }}</span>
                  </div>
                </div>
              </div>

              <!-- Payment Methods -->
              <div class="payment-methods">
                <h3 class="payment-title">Pay via UPI</h3>
                <p class="payment-subtitle">Choose one of the methods below to complete your payment</p>

                <!-- Method Tabs -->
                <div class="method-tabs" role="tablist">
                  <button
                    role="tab"
                    [attr.aria-selected]="paymentMethod() === 'qr'"
                    [class.active]="paymentMethod() === 'qr'"
                    (click)="paymentMethod.set('qr')"
                    class="method-tab"
                  >
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/></svg>
                    Scan QR Code
                  </button>
                  <button
                    role="tab"
                    [attr.aria-selected]="paymentMethod() === 'upi'"
                    [class.active]="paymentMethod() === 'upi'"
                    (click)="paymentMethod.set('upi')"
                    class="method-tab"
                  >
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
                    Pay via UPI ID
                  </button>
                </div>

                <!-- QR Code Tab -->
                @if (paymentMethod() === 'qr') {
                  <div class="tab-content" role="tabpanel">
                    <div class="qr-section">
                      <div class="qr-wrapper">
                        <img src="scan.jpg" alt="UPI Payment QR Code — Scan to pay ₹{{ totalAmount().toLocaleString() }}" width="280" height="280" class="qr-image">
                      </div>
                      <p class="scan-label">Scan with any UPI app (GPay, PhonePe, Paytm, etc.)</p>
                      <div class="qr-amount-badge">
                        Pay: <strong>₹{{ totalAmount().toLocaleString() }}</strong>
                      </div>
                    </div>

                    <div class="upi-id-section">
                      <p class="upi-id-label">Or pay directly to UPI ID:</p>
                      <div class="upi-id-box">
                        <span class="upi-id-text">{{ upiId }}</span>
                        <button (click)="copyUpiId()" class="copy-btn" [attr.aria-label]="copied() ? 'UPI ID copied' : 'Copy UPI ID'">
                          @if (copied()) {
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                            Copied!
                          } @else {
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                            Copy
                          }
                        </button>
                      </div>
                    </div>
                  </div>
                }

                <!-- UPI ID Tab -->
                @if (paymentMethod() === 'upi') {
                  <div class="tab-content" role="tabpanel">
                    <div class="upi-pay-section">
                      <div class="upi-pay-icon">
                        <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                      </div>
                      <h4 class="upi-pay-title">Enter Your UPI ID</h4>
                      <p class="upi-pay-desc">Enter your UPI ID below and a payment request of <strong>₹{{ totalAmount().toLocaleString() }}</strong> will be sent directly to your UPI app.</p>

                      <div class="upi-input-group">
                        <label for="userUpiId" class="upi-input-label">Your UPI ID</label>
                        <div class="upi-input-wrapper">
                          <input
                            type="text"
                            id="userUpiId"
                            [formControl]="userUpiControl"
                            placeholder="e.g. yourname@upi, 9876543210@paytm"
                            class="upi-input"
                            [class.valid]="userUpiControl.valid && userUpiControl.value"
                            [class.invalid]="userUpiControl.invalid && userUpiControl.touched"
                          >
                          @if (userUpiControl.valid && userUpiControl.value) {
                            <svg class="input-status-icon valid" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                          }
                        </div>
                        @if (userUpiControl.invalid && userUpiControl.touched) {
                          <p class="upi-error">Please enter a valid UPI ID (e.g. name&#64;upi)</p>
                        }
                      </div>

                      <div class="collect-request-info">
                        <div class="collect-info-row">
                          <span>Payee (Hotel)</span>
                          <span>{{ upiId }}</span>
                        </div>
                        <div class="collect-info-row">
                          <span>Your UPI ID</span>
                          <span>{{ userUpiControl.value || '—' }}</span>
                        </div>
                        <div class="collect-info-row total">
                          <span>Amount</span>
                          <span>₹{{ totalAmount().toLocaleString() }}</span>
                        </div>
                      </div>

                      @if (collectRequestSent()) {
                        <div class="collect-success">
                          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                          Payment request of <strong>₹{{ totalAmount().toLocaleString() }}</strong> sent to <strong>{{ userUpiControl.value }}</strong>. Please approve it in your UPI app.
                        </div>
                      }

                      <button
                        (click)="sendCollectRequest()"
                        [disabled]="userUpiControl.invalid || !userUpiControl.value || collectRequestSent()"
                        class="btn btn-upi btn-full"
                      >
                        @if (collectRequestSent()) {
                          ✓ Request Sent — Approve in Your App
                        } @else {
                          Send Payment Request to My UPI →
                        }
                      </button>
                    </div>
                  </div>
                }

                <!-- Payment Instructions -->
                <div class="payment-instructions">
                  <h4>How to Pay:</h4>
                  <ol>
                    @if (paymentMethod() === 'qr') {
                      <li>Open any UPI app (Google Pay, PhonePe, Paytm, etc.)</li>
                      <li>Scan the QR code above</li>
                      <li>Enter the amount: <strong>₹{{ totalAmount().toLocaleString() }}</strong></li>
                      <li>Complete the payment and click "I Have Paid" below</li>
                    } @else {
                      <li>Enter your UPI ID above (e.g. yourname&#64;upi)</li>
                      <li>Click "Send Payment Request to My UPI"</li>
                      <li>Open your UPI app and approve the payment request of <strong>₹{{ totalAmount().toLocaleString() }}</strong></li>
                      <li>After approving, click "I Have Paid" below</li>
                    }
                  </ol>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="payment-actions">
                <button (click)="goBackToStep1()" class="btn btn-outline">
                  ← Go Back
                </button>
                <button (click)="confirmBooking()" [disabled]="isLoading()" class="btn btn-green">
                  @if (isLoading()) {
                    Processing...
                  } @else {
                    ✓ I Have Paid — Confirm Booking
                  }
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styleUrl: './booking.css'
})
export class Booking implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private bookingService = inject(BookingService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  bookingForm: FormGroup;
  userUpiControl = this.fb.control('', [Validators.required, Validators.pattern(/^[\w.\-]+@[\w]+$/)]);

  isLoading = signal(false);
  successMessage = signal('');
  errorMessage = signal('');
  allRooms = signal<RoomOption[]>([]);
  filteredRoomOptions = signal<RoomOption[]>([]);
  selectedRoom = signal<RoomOption | null>(null);
  currentStep = signal(1);
  copied = signal(false);
  paymentMethod = signal<'qr' | 'upi'>('qr');
  collectRequestSent = signal(false);

  today = new Date().toISOString().split('T')[0];
  readonly upiId = 'priteshbaraiya.1072005@oksbi';

  cities = [
    'Mumbai', 'Delhi', 'Goa', 'Bangalore', 'Jaipur',
    'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Udaipur',
    'Kochi', 'Shimla', 'Mussoorie', 'Agra', 'Varanasi'
  ];

  numberOfNights = computed(() => {
    const checkIn = this.bookingForm?.value?.checkIn;
    const checkOut = this.bookingForm?.value?.checkOut;
    if (!checkIn || !checkOut) return 1;
    const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    const nights = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 1;
  });

  totalAmount = computed(() => {
    const room = this.selectedRoom();
    if (!room) return 0;
    return room.price * this.numberOfNights();
  });

  constructor() {
    this.bookingForm = this.fb.group({
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      roomType: ['', Validators.required],
      location: ['', Validators.required],
      guests: ['1', Validators.required]
    });
  }

  ngOnInit() {
    this.http.get<RoomOption[]>('http://localhost:5000/api/rooms').subscribe(rooms => {
      this.allRooms.set(rooms);
      this.route.queryParams.subscribe(params => {
        if (params['city']) {
          this.bookingForm.patchValue({ location: params['city'] });
          this.filterRoomsByCity(params['city']);
        }
        if (params['roomId']) {
          this.bookingForm.patchValue({ roomType: params['roomId'] });
          const found = rooms.find(r => r._id === params['roomId']);
          if (found) {
            this.selectedRoom.set(found);
            if (found.hotel) {
              this.bookingForm.patchValue({ location: found.hotel.city });
              this.filterRoomsByCity(found.hotel.city);
            }
          }
        }
      });
    });
  }

  onCityChange() {
    const city = this.bookingForm.value.location;
    this.filterRoomsByCity(city);
    this.bookingForm.patchValue({ roomType: '' });
    this.selectedRoom.set(null);
  }

  filterRoomsByCity(city: string) {
    if (!city) { this.filteredRoomOptions.set([]); return; }
    const filtered = this.allRooms().filter(r => r.hotel && r.hotel.city === city);
    this.filteredRoomOptions.set(filtered);
  }

  onRoomTypeChange() {
    const roomId = this.bookingForm.value.roomType;
    const found = this.filteredRoomOptions().find(r => r._id === roomId);
    this.selectedRoom.set(found || null);
  }

  proceedToPayment() {
    if (this.bookingForm.valid) {
      this.errorMessage.set('');
      const user = this.authService.currentUser();
      if (!user) { this.errorMessage.set('Please log in to make a booking.'); return; }
      this.selectedRoom.update(r => r ? { ...r } : null);
      this.currentStep.set(2);
    }
  }

  goBackToStep1() {
    this.currentStep.set(1);
    this.errorMessage.set('');
    this.collectRequestSent.set(false);
  }

  copyUpiId() {
    navigator.clipboard.writeText(this.upiId).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }

  sendCollectRequest() {
    if (this.userUpiControl.valid && this.userUpiControl.value) {
      // Simulate sending a UPI collect request to the user's UPI ID
      this.collectRequestSent.set(true);
    }
  }

  confirmBooking() {
    this.isLoading.set(true);
    this.errorMessage.set('');

    const user = this.authService.currentUser();
    if (!user) { this.errorMessage.set('Please log in to make a booking.'); this.isLoading.set(false); return; }

    const bookingData = {
      roomId: this.bookingForm.value.roomType,
      checkInDate: this.bookingForm.value.checkIn,
      checkOutDate: this.bookingForm.value.checkOut,
      guestDetails: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: ''
      },
      totalPrice: this.totalAmount()
    };

    this.bookingService.createBooking(bookingData).subscribe({
      next: () => {
        this.successMessage.set('🎉 Payment received & booking confirmed! We will contact you shortly with the details.');
        this.isLoading.set(false);
        this.currentStep.set(1);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.msg || 'Something went wrong. Please try again.');
        this.isLoading.set(false);
      }
    });
  }

  resetForm() {
    this.successMessage.set('');
    this.selectedRoom.set(null);
    this.filteredRoomOptions.set([]);
    this.currentStep.set(1);
    this.collectRequestSent.set(false);
    this.userUpiControl.reset();
    this.bookingForm.reset({ guests: '1' });
  }
}
