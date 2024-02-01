import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CurrencyRate } from 'src/app/domain/model/currency-rate';
import { CardStatus } from 'src/app/domain/enum/card-status';
import { CacheService } from 'src/app/services/cache.service';
import { CurrencyConverterService } from 'src/app/services/currency-converter.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() title: string = '';
  @Input() currencyCode: string = '';
  currencyRate: CurrencyRate | null = null;
  lastUpdatedAt: Date | null = null;
  updateSubscription: Subscription | null = null;
  status: CardStatus = CardStatus.Loading;
  timeToLive: number = 18000; //3min

  constructor(
    private currencyConverterService: CurrencyConverterService,
    private cacheService: CacheService
  ) {}

  ngOnInit(): void {
    const cached = this.cacheService.getFullItem<CurrencyRate>(
      this.currencyCode
    );
    if (cached) {
      this.currencyRate = cached.value;
      this.lastUpdatedAt = cached.createdAt;
      this.status = CardStatus.Ready;
    } else {
      this.getCurrencyRate();
    }

    this.updateSubscription = interval(this.timeToLive).subscribe(() => {
      this.getCurrencyRate();
    });
  }

  ngOnDestroy(): void {
    this.updateSubscription?.unsubscribe();
  }

  get CardStatus() {
    return CardStatus;
  }

  getCurrencyRate(): void {
    this.status = CardStatus.Loading;
    this.currencyConverterService.getCurrencyRate(this.currencyCode).subscribe({
      next: (rate) => {
        const cached = this.cacheService.setItem(
          this.currencyCode,
          rate,
          this.timeToLive
        );
        this.currencyRate = cached.value;
        this.lastUpdatedAt = cached.createdAt;
        this.status = CardStatus.Ready;
      },
      error: () => {
        this.status = CardStatus.Error;
      },
    });
  }
}
