import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CURRENCY_URL } from './constants';
import { CurrencyResponse } from './model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyApiService {

  constructor(private http: HttpClient) { }

  getRates$(): Observable<CurrencyResponse[]> {
    return this.http.get(CURRENCY_URL) as Observable<CurrencyResponse[]>;
  }
}
