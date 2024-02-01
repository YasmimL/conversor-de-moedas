import { Component } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {
  cards = [
    { title: 'Dólar Canadense', currencyCode: 'CAD-BRL' },
    { title: 'Peso Argentino', currencyCode: 'ARS-BRL' },
    { title: 'Libra Esterlina', currencyCode: 'GBP-BRL' },
  ];
}
