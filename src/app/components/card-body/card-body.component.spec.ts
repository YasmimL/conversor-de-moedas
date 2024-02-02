import { ComponentFixture, TestBed } from '@angular/core/testing';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
import { CardBodyComponent } from './card-body.component';

registerLocaleData(localePt);

describe('CardBodyComponent', () => {
  let component: CardBodyComponent;
  let fixture: ComponentFixture<CardBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardBodyComponent],
      providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
    }).compileComponents();

    fixture = TestBed.createComponent(CardBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render currency rate', () => {
    component.currencyRate = { value: 4.37, percentChange: -0.11 };
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('span')?.innerText).toBe(
      'R$ 4,37'
    );
  });

  it('should render value in red when it is less than or equal to 1', () => {
    component.currencyRate = { value: 0.05, percentChange: -0.11 };
    fixture.detectChanges();

    const span = fixture.nativeElement.querySelector('span');
    expect(window.getComputedStyle(span).color).toBe('rgb(221, 75, 75)');
  });

  it('should render value in blue when it is greater than 5', () => {
    component.currencyRate = { value: 5.37, percentChange: -0.11 };
    fixture.detectChanges();

    const span = fixture.nativeElement.querySelector('span');
    expect(window.getComputedStyle(span).color).toBe('rgb(54, 132, 203)');
  });

  it('should render value in green when it is between 1 and 5', () => {
    component.currencyRate = { value: 2.6, percentChange: -0.11 };
    fixture.detectChanges();

    const span = fixture.nativeElement.querySelector('span');
    expect(window.getComputedStyle(span).color).toBe('rgb(60, 118, 73)');
  });
});
