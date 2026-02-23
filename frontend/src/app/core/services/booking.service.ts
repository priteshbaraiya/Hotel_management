import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface BookingData {
    roomId: string;
    checkInDate: string;
    checkOutDate: string;
    guestDetails: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    };
    totalPrice: number;
}

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    private http = inject(HttpClient);
    private authService = inject(AuthService);
    private apiUrl = 'http://localhost:5000/api/bookings';

    createBooking(bookingData: BookingData): Observable<any> {
        const token = this.authService.getToken();
        const headers = new HttpHeaders().set('x-auth-token', token || '');
        return this.http.post(this.apiUrl, bookingData, { headers });
    }

    getMyBookings(): Observable<any> {
        const token = this.authService.getToken();
        const headers = new HttpHeaders().set('x-auth-token', token || '');
        return this.http.get(`${this.apiUrl}/my-bookings`, { headers });
    }
}
