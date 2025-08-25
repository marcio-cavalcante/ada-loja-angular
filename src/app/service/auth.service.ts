import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private apiUrl = 'https://fakestoreapi.com/';
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}auth/login`, { username, password })
      .pipe(
        map((response) => {
          if (response.token) {
            const decodedToken = this.jwtHelper.decodeToken(response.token);
            const user: User = {
              id: decodedToken.sub || 0,
              username: decodedToken.user || username,
              email: decodedToken.email || `${username}@example.com`,
              role: decodedToken.role || 'customer',
            };
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('token', response.token);
            this.currentUserSubject.next(user);
            return true;
          }
          return false;
        }),
        catchError((error) => {
          console.error('Erro de login:', error);
          return of(false);
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/home/products']);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  isAdmin(): boolean {
    return this.currentUserValue?.role === 'admin';
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
