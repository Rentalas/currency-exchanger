import { Injectable } from '@angular/core';
import { CurrencyCourseService } from './currency-course.service';
import { Currency, CurrencyModel } from './model';

@Injectable({
  providedIn: 'root'
})
export class ConvertatorService {

  constructor(private currencyCourseService: CurrencyCourseService) { }

  convertCurrency(convertToCurrency: Currency, data: CurrencyModel): CurrencyModel {
    const { currency, amount } = data;
    const rate = this.currencyCourseService.getRate(convertToCurrency, currency);
    const convertedAmount = amount * rate;
    const truncatedAmount = this.truncateCurrencyAmount(convertedAmount);

    return {
      currency: convertToCurrency,
      amount: truncatedAmount,
    };
  }

  private truncateCurrencyAmount(value: number, digitsAfterDecimal: number = 2): number {
    const coefficient = 10 ** digitsAfterDecimal;
    return Math.trunc(value * coefficient) / coefficient;
  }
}
