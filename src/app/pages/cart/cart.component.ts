import { Component, inject } from '@angular/core';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartService = inject(CartService);

  clearCart(): void {
    this.cartService.clearCart();
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }
}
