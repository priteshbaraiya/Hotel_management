import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private readonly backendUrl = 'http://localhost:5000';
  private apiUrl = `${this.backendUrl}/api/rooms`;

  constructor(private http: HttpClient) { }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiUrl);
  }

  getRoom(id: string): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/${id}`);
  }

  // Helper to get the full image URL
  getImageUrl(imagePath: string): string {
    return `${this.backendUrl}/${imagePath}`;
  }
}
