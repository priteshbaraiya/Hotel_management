import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'guest' | 'staff' | 'admin';
}

interface AuthResponse {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'guest' | 'staff' | 'admin';
    token: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSignal = signal<User | null>(null);
    readonly currentUser = this.currentUserSignal.asReadonly();
    readonly isAuthenticated = computed(() => !!this.currentUserSignal());
    readonly userRole = computed(() => this.currentUserSignal()?.role);

    private readonly API_URL = 'http://localhost:5000/api/auth';

    constructor(private http: HttpClient, private router: Router) {
        this.loadUserFromStorage();
    }

    private loadUserFromStorage() {
        const token = localStorage.getItem('token');
        const userJson = localStorage.getItem('user');
        if (token && userJson) {
            try {
                const user = JSON.parse(userJson) as User;
                this.currentUserSignal.set(user);
            } catch {
                this.clearStorage();
            }
        }
    }

    private saveToStorage(token: string, user: User) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    }

    private clearStorage() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    private mapResponseToUser(response: AuthResponse): User {
        return {
            id: response._id,
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
            role: response.role
        };
    }

    login(credentials: { email: string; password: string }) {
        return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials).pipe(
            tap(response => {
                this.handleAuthentication(response);
            })
        );
    }

    register(userData: any) {
        return this.http.post<{ msg: string }>(`${this.API_URL}/register`, userData);
    }

    private handleAuthentication(response: AuthResponse) {
        const user = this.mapResponseToUser(response);
        this.saveToStorage(response.token, user);
        this.currentUserSignal.set(user);
        this.redirectUser(user.role);
    }

    logout() {
        this.clearStorage();
        this.currentUserSignal.set(null);
        this.router.navigate(['/login']);
    }

    forgotPassword(email: string) {
        return this.http.post<{ msg: string }>(`${this.API_URL}/forgot-password`, { email });
    }

    resetPassword(token: string, password: string) {
        return this.http.post<{ msg: string }>(`${this.API_URL}/reset-password`, { token, password });
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    private redirectUser(role: string) {
        switch (role) {
            case 'admin':
                this.router.navigate(['/admin']);
                break;
            case 'staff':
                this.router.navigate(['/staff']);
                break;
            default:
                this.router.navigate(['/guest']);
        }
    }
}
