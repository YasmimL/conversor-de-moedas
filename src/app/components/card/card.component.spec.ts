import {
  ComponentFixture,
  TestBed,
  discardPeriodicTasks,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';

import { registerLocaleData } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
import { of, throwError } from 'rxjs';
import { CardStatus } from 'src/app/domain/enum/card-status';
import { CurrencyRate } from 'src/app/domain/model/currency-rate';
import { CacheService } from 'src/app/services/cache.service';
import { CurrencyConverterService } from 'src/app/services/currency-converter.service';
import { CardBodyComponent } from '../card-body/card-body.component';
import { CardLoadingComponent } from '../card-loading/card-loading.component';
import { CardComponent } from './card.component';

registerLocaleData(localePt);

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let mockCurrencyConverterService: jasmine.SpyObj<CurrencyConverterService>;
  let mockCacheService: jasmine.SpyObj<CacheService>;
  let mockCurrencyRate: CurrencyRate;

  beforeEach(async () => {
    mockCurrencyConverterService = jasmine.createSpyObj(['getCurrencyRate']);
    mockCacheService = jasmine.createSpyObj([
      'setItem',
      'getFullItem',
      'getItem',
    ]);

    await TestBed.configureTestingModule({
      declarations: [CardComponent, CardBodyComponent, CardLoadingComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
    });

    TestBed.overrideProvider(CurrencyConverterService, {
      useValue: mockCurrencyConverterService,
    });
    TestBed.overrideProvider(CacheService, { useValue: mockCacheService });

    TestBed.compileComponents();
  });

  beforeEach(() => {
    mockCurrencyRate = { value: 4.37, percentChange: -0.11 };

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;

    mockCurrencyConverterService.getCurrencyRate.and.returnValue(
      of(mockCurrencyRate)
    );
    mockCacheService.setItem.and.returnValue({
      createdAt: new Date(),
      expiresAt: Date.now() + 5000,
      value: mockCurrencyRate,
    });

    component.title = 'Peso Argentino';
    component.currencyCode = 'ARS-BRL';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should try to get rate from cache on init', () => {
    spyOn(component, 'getCurrencyRate');

    const now = new Date();
    mockCacheService.getFullItem.and.returnValue({
      createdAt: new Date(),
      expiresAt: now.getTime() + 5000,
      value: mockCurrencyRate,
    });

    component.ngOnInit();

    expect(component.getCurrencyRate).not.toHaveBeenCalled();

    expect(component.currencyRate).toEqual(
      jasmine.objectContaining(mockCurrencyRate)
    );
    expect(component.lastUpdatedAt?.getTime()).toBe(now.getTime());
    expect(component.status).toEqual(CardStatus.Ready);
  });

  it('should try to get an updated rate every 3 minutes', fakeAsync(() => {
    spyOn(component, 'getCurrencyRate');

    component.ngOnInit();

    tick(component.timeToLive);
    tick(component.timeToLive);
    tick(component.timeToLive);

    discardPeriodicTasks();
    flush();

    expect(component.getCurrencyRate).toHaveBeenCalledTimes(4);
  }));

  it('should handle HTTP error', () => {
    mockCurrencyConverterService.getCurrencyRate.and.returnValue(
      throwError(() => new Error('something went wrong'))
    );

    component.getCurrencyRate();

    expect(component.status).toEqual(CardStatus.Error);
  });
});
