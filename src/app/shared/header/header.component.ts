import { Component, Signal, signal, inject, effect, computed } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';

@Component({
  imports: [FormsModule],
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

  private cartservice = inject(CartService);
  private productService = inject(ProductService);
  private authService = inject(AuthService);
  private router = inject(Router);

  //images
  searchIcon: string = "assets/images/material-symbols--search.png";
  cartIcon: string = "assets/images/cart-white.png";
  userIcon: string = "assets/images/user.png";

  query = signal<string>("");

 constructor(){
  effect((onCleanup)=>{
    this.query();
    const time = setTimeout(()=>{
      this.productService.setQuery(this.query());
      this.query().length && this.router.navigate(["products"]);
      console.log(this.query());
    },800);
    onCleanup(()=>clearTimeout(time));
  })
 }

  cartCounter = computed(() => this.cartservice.getTotalQty());

  logout(): void {
    this.authService.logout();
  }

  handleNavigateToCart(): void {
    this.router.navigate(['/cart']);
  }

  handleNavigateToUser(): void {
    this.router.navigate(['/login']);
  }

  handleNavigateToHome(): void {
    this.router.navigate(['/']);
  }

}
