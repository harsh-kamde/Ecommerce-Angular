import { Component, signal, inject } from '@angular/core';
import { Product } from '../../products/product.model';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'trending-product',
  imports: [CurrencyPipe],
  standalone: true,
  templateUrl: './trending-product.component.html',
  styleUrl: './trending-product.component.css',
})
export class TrendingProductComponent {
  trendingProducts = signal<Product[]>([]);
  loading = signal<boolean>(true);

  private productService = inject(ProductService);
  private router = inject(Router);

  showProduct(id: string){
    this.router.navigate(["/products",id]);
  }

  buyNow(event:Event,product:Product){
    event.stopPropagation();
    // this.cartService.addToCart(product);
    this.router.navigate(["/cart"])
  }

  ngOnInit() {
    this.productService.getTrendingProducts().then((products) => {
      if (products) {
        this.trendingProducts.set(products);
        this.loading.set(false);
        console.log("trendingProducts: ",this.trendingProducts());
      } else {
        console.log('No Products found');
      }
    });
  }
}
