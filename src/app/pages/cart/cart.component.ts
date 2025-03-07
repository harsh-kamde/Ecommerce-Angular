import { Component, computed, inject, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, FormsModule],
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  private cartSevice = inject(CartService);
  private router = inject(Router);
  pincode = '';
  error = '';
  infoVisible = signal<boolean>(false);
  deliveryAvailable = signal<boolean>(false);
  deliveryCharge = signal<number>(0);

  locationIcon: string = '../../../assets/images/location.png';

  cartItems = computed(() => this.cartSevice.cartItems()); 
  total = computed(() => this.cartSevice.getTotal());
  totalQty = computed(() => this.cartSevice.getTotalQty());

  incrementProductCount(productId: string) {
    this.cartSevice.updateQuantity(productId, 1);
  }

  decrementProductCount(productId: string) {
    this.cartSevice.updateQuantity(productId, -1);
  }

  navigateToProducts() {
    this.router.navigate(['/products']);
  }


  handlePincodeSubmit() {
    if (this.pincode.length == 6 && this.pincode >= '100000') {
      this.infoVisible.set(false);
      this.deliveryCharge.set(40);
      this.deliveryAvailable.set(true);
      
    } else {
      this.error = 'Please Enter a valid pincode';
      this.deliveryAvailable.set(false);
      this.infoVisible.set(true);
    }
  }
}
