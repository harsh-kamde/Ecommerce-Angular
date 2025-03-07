import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../pages/products/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private httpClient = inject(HttpClient);
  private query = signal<string>('');
  getQuery = this.query.asReadonly();
  private apiUrl = environment.apiUrl;

  setQuery(query: string) {
    this.query.set(query);
  }

  getTrendingProducts() {
    return this.httpClient
      .get<Product[]>(`${this.apiUrl}products?limit=3`)
      .toPromise()
      .catch(() => []);
  }

  getProducts() {
    return this.httpClient
      .get<Product[]>(`${this.apiUrl}products`)
      .toPromise()
      .catch(() => []);
  }

  getProductById(id: string) {
    return this.httpClient
      .get<Product>(`${environment.apiUrl}products/${id}`)
      .toPromise()
      .catch(() => []);
  }
  
  getSimilarProducts(category: string) {
    return this.httpClient
      .get<Product[]>(`${environment.apiUrl}products/category/${category}`)
      .toPromise()
      .catch(() => []);
  }

}
