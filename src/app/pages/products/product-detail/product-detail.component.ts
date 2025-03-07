import { Component, computed, inject, input, signal } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';
import { emptyProduct, Product } from '../product.model';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe],
  standalone: true,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  private cartService = inject(CartService);
  private router = inject(Router);
  
  starImg = '../../../../assets/images/star.png';
  
  isLoading = signal<boolean>(false);
  productSignal = signal<Product>(emptyProduct);
  similarProductsSignal = signal<Product[]>([]);
  discountPercentage = 68;
  isAddedToCart = computed(() => {
    const productId = this.productSignal().id;
    return this.cartService.isAddedToCart(productId);
  });

  removeFromCart(productId: string) {
    this.cartService.removeFromCart(productId);
  }

  addToCart(productId: string) {
    this.cartService.addToCart(this.productSignal(), 1);
    // this.isAddedToCart.update(() => this.cartService.isAddedToCart(productId));
  }

  incrementProductCount(productId: string) {
    this.cartService.updateQuantity(productId, 1);
  }

  decrementProductCount(productId: string) {
    this.cartService.updateQuantity(productId, -1);
  }

  getItemQuantity(productId: string) {
    return this.cartService.getCartItemCount(productId);
  }

  constructor(private route:ActivatedRoute, private productService: ProductService){}

  showProduct(id: string){
    this.router.navigate(['products', id]);
  }

  buyNow(){
    this.router.navigate(["/cart"])
  }

  getOriginalPrice(): number {
    const discountedPrice = Number(this.productSignal().price);
    return Math.round(discountedPrice / (1 - this.discountPercentage / 100));
  }

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.isLoading.set(true);
      this.productService.getProductById(productId)
        .then((product) => {
          if (product) {
            const productObj = product as Product;
            this.productSignal.set(productObj);
            console.log(productObj);
            
            this.productService.getSimilarProducts(productObj.category)
              .then((similarProducts) => {
                const filteredSimilarProducts = (similarProducts || []).filter(p => p.id !== productObj.id).slice(0, 3);;
                this.similarProductsSignal.set(filteredSimilarProducts);
              })
              .catch((error) => {
                console.error('Error fetching similar products:', error);
                this.similarProductsSignal.set([]);
              });

            this.isLoading.set(false); 
          }
        })
        .catch((error) => {
          console.error('Error fetching product:', error);
          this.isLoading.set(false);  
        });
    }
  }
}

