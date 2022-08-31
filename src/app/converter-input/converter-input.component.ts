import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { Currency, CurrencyModel } from '../model';

@Component({
  selector: 'app-converter-input',
  templateUrl: './converter-input.component.html',
  styleUrls: ['./converter-input.component.scss']
})
export class ConverterInputComponent implements OnChanges {
  @Input() currencyData!: CurrencyModel;
  @Output() currencyChange: EventEmitter<Currency> = new EventEmitter();
  @Output() amountChange: EventEmitter<number> = new EventEmitter();
  @ViewChild('currency', { static: true }) currencyInput: ElementRef<HTMLSelectElement>;
  @ViewChild('amount', { static: true }) amountInput: ElementRef<HTMLInputElement>;

  Currency = Currency;
  private currency!: Currency;
  private amount!: number;

  ngOnChanges() {
      const { currency, amount } = this.currencyData ?? {};
      const shouldUpdate = this.currency !== currency || this.amount !== amount;

      if (shouldUpdate) {
          this.setAmount(amount);
          this.setCurrency(currency);
      }
  }

  onAmountChange(amount: string) {
      this.amount = Number(amount);
      this.amountChange.emit(this.amount);
  }

  onCurrencyChange(currency: string) {
      this.currency = currency as Currency;
      this.currencyChange.emit(this.currency);
  }

  private setCurrency(currency: Currency) {
      this.currency = currency;
      this.currencyInput.nativeElement.value = currency;
  }

  private setAmount(amount: number) {
      this.amount = amount;
      this.amountInput.nativeElement.value = String(amount);
  }
}
