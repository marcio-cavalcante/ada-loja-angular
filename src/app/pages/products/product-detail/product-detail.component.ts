import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../service/products.service';
import { Product } from '../../../models/product';
import { CartService } from '../../../service/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  // Recebe produto
  product: Product | undefined;

  // Injeta o CartService para adicionar produtos ao carrinho
  private cartService = inject(CartService);

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productsService.getProductById(id).subscribe((data: Product) => {
      this.product = data;
      console.log('Produto recebido:', this.product);
    });
  }

  addToCart() {
    this.cartService.addToCart(this.product!);
    alert(
      'Produto adicionado ao carrinho: ' + JSON.stringify(this.product?.title)
    );
  }
}
