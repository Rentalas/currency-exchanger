import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CurrencyApiService } from './currency-api.service';
import { Currency, CurrencyRates, CurrencyResponse } from './model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyCourseService {

  currencyRates: CurrencyRates = {} as CurrencyRates;
    exchangeDate$: Subject<string> = new Subject();
    currencyRates$: Subject<CurrencyRates> = new Subject();

    constructor(private currencyApiService: CurrencyApiService) {
        this.getRates();
    }

    getRate(currencyTo: Currency, currencyFrom: Currency): number {
        if(currencyFrom === currencyTo) {
            return 1;
        }

        if(currencyTo !== Currency.Uah && currencyFrom !== Currency.Uah) {
            return this.crossCourseRate(currencyTo, currencyFrom)
        }

        const courseCurrency = currencyFrom === Currency.Uah ? currencyTo : currencyFrom;
        const ratioToHrn = this.currencyRates[courseCurrency];
        
        return currencyTo === Currency.Uah
            ? ratioToHrn
            : 1 / ratioToHrn;
    }

    getRates(): void {
        this.currencyApiService.getRates$()
            .subscribe(rates => {
                const parsedRates = this.parseCourseResponse(rates);
                this.currencyRates = parsedRates;
                this.exchangeDate$.next(rates[0].exchangedate);
                this.currencyRates$.next(parsedRates);
            });
    }

    private parseCourseResponse(response: CurrencyResponse[]): CurrencyRates {
        return response.reduce((acc, course) => {
            const currency = course.cc;
            acc[currency] = course.rate;
            return acc;
        }, {} as CurrencyRates);
    }

    private crossCourseRate(currencyTo: Currency, currencyFrom: Currency): number {
        const currencyToRate = this.currencyRates[currencyTo];
        const currencyFromRate = this.currencyRates[currencyFrom];

        return currencyFromRate / currencyToRate;
    }
}
