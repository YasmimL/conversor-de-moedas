import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CurrencyConverterService } from './currency-converter.service';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

describe('CurrencyConverterService', () => {
  let service: CurrencyConverterService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurrencyConverterService],
    });

    service = TestBed.inject(CurrencyConverterService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get currency rate', () => {
    const mockRate = [
      {
        code: 'CAD',
        codein: 'BRL',
        name: 'Dólar Canadense/Real Brasileiro',
        high: '3.6951',
        low: '3.6705',
        varBid: '-0.0124',
        pctChange: '-0.34',
        bid: '3.6695',
        ask: '3.675',
        timestamp: '1706798860',
        create_date: '2024-02-01 11:47:40',
      },
    ];
    const expectedResult = { value: 3.6695, percentChange: -0.34 };

    service.getCurrencyRate('CAD-BRL').subscribe((data) => {
      expect(data).toEqual(expectedResult);
    });

    const mockReq = httpTestingController.expectOne(
      `${environment.apiUrl}/CAD-BRL`
    );
    expect(mockReq.request.method).toEqual('GET');

    mockReq.flush(mockRate);
  });

  it('should handle HTTP error', () => {
    const errMessage = 'deliberate 404 error';

    service.getCurrencyRate('invalid-code').subscribe({
      next: () => fail('should have failed with the 404 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).withContext('status').toEqual(404);
        expect(error.error).withContext('message').toEqual(errMessage);
      },
    });

    const mockReq = httpTestingController.expectOne(
      `${environment.apiUrl}/invalid-code`
    );

    mockReq.flush(errMessage, { status: 404, statusText: 'Not Found' });
  });
});
