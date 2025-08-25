import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../service/products.service'
import { Product } from '../../../models/product';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrl: './product-manager.component.css'
})
export class ProductManagerComponent implements OnInit {
  products: Product[] = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      console.log('Produtos recebidos no módulo gerenciamento:', this.products);
    });
  }

deleteProduct(id: number): void {
  this.products = this.products.filter(product => product.id !== id);
  console.log(`Produto com ID ${id} removido localmente.`);
}

}
