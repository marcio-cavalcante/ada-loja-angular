import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

// Estrutura usuário retornado pela FakeStoreAPI - já com previsão de uso de todos os campos
interface UserResponse {
  id: number;
  email: string;
  username: string;
  password?: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  phone: string;
  // Não tem role na API, mas foi adicionado para manipular usuário admin
  role?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://fakestoreapi.com/auth/login';
  private currentUserSubject: BehaviorSubject<UserResponse | null>;
  public currentUser: Observable<UserResponse | null>;

  // DEFINIÇÃO DOS ADMINISTRADORES MANUALMENTE PELO FATO DA API NÃO POSSUIR ESSA CARACTERÍSTICA
  private adminUsernames: string[] = ['johnd', 'mor_2314']; // johnd e mor_2314 como admins

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<UserResponse | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserResponse | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      map((response) => {
        // Armazegem do token no localStorage.
        localStorage.setItem('token', response.token);

        // Objeto de usuário mockado, pois a API não retorna detalhes do usuário
        const mockUser: UserResponse = {
          id: 1,
          email: `${username}@example.com`,
          username: username,
          name: { firstname: 'John', lastname: 'Doe' },
          address: {
            city: 'Anytown',
            street: 'Main St',
            number: 1,
            zipcode: '12345',
            geolocation: { lat: '0', long: '0' },
          },
          phone: '123-456-7890',
        };

        // Lógica para definição do tipo de usuário
        if (this.adminUsernames.includes(username)) {
          mockUser.role = 'admin';
        } else {
          mockUser.role = 'user';
        }

        // Armazena usuário no localStorage
        localStorage.setItem('currentUser', JSON.stringify(mockUser));
        this.currentUserSubject.next(mockUser);

        return mockUser;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    return (
      this.currentUserSubject.value !== null &&
      localStorage.getItem('token') !== null
    );
  }

  public isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    console.log(
      'Verificando isAdmin():',
      user ? user.username : 'Nenhum usuário',
      'Role:',
      user ? user.role : 'N/A'
    );
    return user !== null && user.role === 'admin';
  }
}