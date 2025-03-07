import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'hero',
  imports: [],
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

  private router = inject(Router);

  laptopImg: string = "assets/images/laptopBag.png";
  
  navigateToProduct(): void {
    this.router.navigate(['/products']);
  }
}
