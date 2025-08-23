import { Injectable } from '@angular/core';

// Imports para adquirir os dados da api
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Import da Interface para tipar os produtos
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // Variável URL da API
  private apiUrl = 'https://fakestoreapi.com/products';

  // Instancia do HttpClient
  constructor(private http: HttpClient) {}

  // Método para obter os produtos do link
  getProducts(): Observable<Product[]> {
    console.log('Obtendo produtos da API:', this.apiUrl);
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Médoto para obter um produto específico por ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
