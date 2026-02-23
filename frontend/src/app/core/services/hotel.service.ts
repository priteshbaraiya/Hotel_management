import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Hotel {
    _id: string;
    name: string;
    city: string;
    address: string;
    description: string;
    imagePath: string;
    stars: number;
    photos: string[];
}

@Injectable({
    providedIn: 'root'
})
export class HotelService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:5000/api/hotels';

    getHotels(city?: string): Observable<Hotel[]> {
        let url = this.apiUrl;
        if (city) {
            url += `?city=${city}`;
        }
        return this.http.get<Hotel[]>(url);
    }

    getHotelById(id: string): Observable<Hotel> {
        return this.http.get<Hotel>(`${this.apiUrl}/${id}`);
    }
}
