import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { CategoryCardComponent } from './category-card/category-card.component';
import { TrendingProductComponent } from './trending-product/trending-product.component';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, CategoryCardComponent, TrendingProductComponent],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
}
