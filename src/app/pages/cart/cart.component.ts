import { Component, inject } from '@angular/core';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  // cartService = new CartService();
  // cartItems = this.cartService.getCartItems();
  // total = this.cartService.getTotal();
  cartService = inject(CartService);
}
