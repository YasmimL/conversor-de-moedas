import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CurrencyRateResponse } from '../domain/interfaces/currency-rate-response';
import { Observable, map } from 'rxjs';
import { CurrencyRate } from '../domain/model/currency-rate';

@Injectable({
  providedIn: 'root',
})
export class CurrencyConverterService {
  constructor(private http: HttpClient) {}

  getCurrencyRate(currencyCode: string): Observable<CurrencyRate> {
    return this.http
      .get<CurrencyRateResponse[]>(`${environment.apiUrl}/${currencyCode}`)
      .pipe(
        map(([{ bid, pctChange }]) => {
          return {
            value: +bid,
            percentChange: +pctChange,
          };
        })
      );
  }
}
