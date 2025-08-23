// Inclusão do OnInit para consumo da API
import { Component, OnInit } from '@angular/core';

// Imports da interface e do service
import { ProductsService } from '../../../service/products.service';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent implements OnInit {
  // Array vazio para receber os produtos
  products: Product[] = [];

  // Array vazio para receber as categorias
  categories: string[] = [];

  // Array para armazenar produtos filtrados
  filteredProducts: Product[] = [];

  // Instancioando o service
  constructor(private productsService: ProductsService) {}

  // Chamando método getProducts do productsService para subscrição
  ngOnInit(): void {
    this.productsService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      console.log('Produtos recebidos:', this.products);

      // Exibição de todos produtos inicialmente
      this.filteredProducts = data;

      // Extraindo categorias
      this.categories = Array.from(
        new Set(data.map((product) => product.category))
      ).sort();
      console.log('Categorias extraídas:', this.categories);
    });
  }

  filterByCategory(category: string): void {
    if (category === 'Todos') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(
        (p) => p.category === category
      );
    }
  }
}
