import { Component, Input } from '@angular/core';
import { CurrencyRate } from 'src/app/domain/model/currency-rate';

@Component({
  selector: 'app-card-body',
  templateUrl: './card-body.component.html',
  styleUrls: ['./card-body.component.scss']
})
export class CardBodyComponent {
  @Input() currencyRate?: CurrencyRate | null;

}
