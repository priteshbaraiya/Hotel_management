import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChatMessage {
    text: string;
    sender: 'user' | 'bot';
    timestamp?: Date;
}

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private http = inject(HttpClient);
    // Hardcoded for now as environment file access failed previously
    private apiUrl = 'http://localhost:5000/api/chat';

    sendMessage(message: string): Observable<{ response: string }> {
        return this.http.post<{ response: string }>(`${this.apiUrl}/message`, { message });
    }
}
