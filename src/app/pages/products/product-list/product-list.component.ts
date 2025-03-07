import { Component, computed, inject, signal } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../product.model';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe],
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  private productService = inject(ProductService);
  products = signal<Product[]>([]);
  isLoading = signal<boolean>(false);
  private router = inject(Router);
  filter = signal<{ gender: string; category: string }>({ gender: '', category: '' });
  query = computed(()=>this.productService.getQuery());
  gender = computed(()=>this.filter().gender);
  category = computed(()=>this.filter().category);
  isFilterVisible = signal<boolean>(false);

  cartImg: string = '../../../../assets/images/cart-fill-red.png';
  filterImg: string = '../../../assets/images/filter.png';

  getProducts = computed(() => {
    const filterProducts: Product[] = [];
    const queryLowerCase = this.query().toLowerCase();
    const genderValue = this.gender().toLowerCase();
    const categoryValue = this.category().toLowerCase();
    
    
    this.products().forEach((product) => {
      const isProductAvailable =
        product.category.toLowerCase().includes(queryLowerCase) ||
        product.title.toLowerCase().includes(queryLowerCase);

      const genderIdx = product.category
        .toLowerCase()
        .indexOf(genderValue);

      const isCategoryAvailable = product.category
        .toLowerCase()
        .includes(categoryValue);

      if (
        isProductAvailable &&
        isCategoryAvailable &&
        (genderIdx === 0 || product.category[genderIdx - 1] === ' ')
      ) {
        filterProducts.push(product);
      }
    });
    console.log(filterProducts);
    console.log("products in fitlerproduct: ",this.products)
    return filterProducts;
  });

  updateGender(gender: string) {
    this.filter.set({ gender, category: this.category() });
    this.getProducts();
  }

  updateCategory(category: string) {
    this.filter.set({ gender: this.gender(), category });
  }

  clearFilters() {
    this.filter.set({ gender: '', category: ''});
  }

  toggleFilters() {
    this.isFilterVisible.set(!this.isFilterVisible());
    //adding the class filter-deactive on 
  }

  showProduct(id: string){
    this.router.navigate(["/products",id]);
  }

  setFilter(gender: string = '', category: string = '') {
    this.filter.set({ gender, category });
  }
  addToCart(product: any) {
    console.log('Added to cart:', product);
    alert(`${product.title} added to cart!`);
  }

  ngOnInit() {
    this.isLoading.set(true);
    this.productService.getProducts().then((products) => {
      if (products) {
        this.products.set(products);
        this.isLoading.set(false);
      } else {
        console.log('No Products found');
      }
    });

  }

}
