import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'card',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './data-card.component.html',
  styleUrl: './data-card.component.css'
})
export class DataCardComponent {

  @Input({required:true}) cardData!:CardsData;

  imagepath(imgpath : string) : string{
      return "../../../../../assets/images/"+ imgpath;
  }

}

type Card = {
  id:string,
  name:string,
  img:string
}

type CardsData = {
  title:string,
  items:Card[]
}
