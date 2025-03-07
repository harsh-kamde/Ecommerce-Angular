import { Component } from '@angular/core';
import { DataCardComponent } from './data-card/data-card.component';
import dummyData from '../data.json';

@Component({
  selector: 'category-card',
  imports: [DataCardComponent],
  standalone: true,
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css'
})

export class CategoryCardComponent {
    data = dummyData;
}
