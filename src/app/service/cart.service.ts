import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Product[] = [];

  
  constructor() {}

  // Método ADIÇÃO ao carrinho
  addToCart(product: Product): void {
    this.cartItems.push(product);
  }

  // Método Remove produto por ID
  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter((p) => p.id !== productId);
  }

  // Método Retorno todos itens do carrinho
  getCartItems(): Product[] {
    return [...this.cartItems];
  }

  // Limpa carrinho
  clearCart(): void {
    this.cartItems = [];
  }

  // Calcula o total
  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }
}