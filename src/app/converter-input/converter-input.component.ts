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

    ngOnChanges() {
        this.currencyInput.nativeElement.value = this.currencyData.currency;
        this.amountInput.nativeElement.value = String(this.currencyData.amount);
    }

    onAmountChange(amount: string): void {
        this.amountChange.emit(+amount);
    }

    onCurrencyChange(currency: string): void {
        this.currencyChange.emit(currency as Currency);
    }
}
