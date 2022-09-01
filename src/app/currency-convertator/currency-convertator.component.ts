import { Component, OnInit } from '@angular/core';
import { ConvertatorService } from '../convertator.service';
import { Currency, CurrencyModel } from '../model';

@Component({
    selector: 'app-currency-convertator',
    templateUrl: './currency-convertator.component.html',
    styleUrls: ['./currency-convertator.component.scss']
})
export class CurrencyConvertatorComponent implements OnInit {
    detailData!: CurrencyModel;
    masterData!: CurrencyModel;

    constructor(private convertatorService: ConvertatorService) { }

    ngOnInit() {
        this.detailData = this.setInitialData();
        this.masterData = this.setInitialData();
    }

    onCurrencyDataChange(sourceInput: string, currency: Currency): void {
        const dataProp = sourceInput === 'master' ? this.masterData : this.detailData;
        dataProp.currency = currency;
        this.updateDetailData();
    }

    onAmountDataChange(sourceInput: string, amount: number): void {
        const dataProp = sourceInput === 'master' ? this.masterData : this.detailData;
        const updateDataMethod = sourceInput === 'master' ? this.updateDetailData : this.updateMasterData;

        dataProp.amount = amount;
        updateDataMethod.call(this);
    }

    private setInitialData(): CurrencyModel {
        return {
            currency: null,
            amount: null,
        };
    }

    private updateMasterData(): void {
        const shouldConvert = this.shouldConvert(this.masterData?.currency, this.detailData);

        if (shouldConvert) {
            this.masterData = this.convertatorService.convertCurrency(this.masterData?.currency, this.detailData);
        }
    }

    private updateDetailData(): void {
        const shouldConvert = this.shouldConvert(this.detailData?.currency, this.masterData);

        if (shouldConvert) {
            this.detailData = this.convertatorService.convertCurrency(this.detailData?.currency, this.masterData);
        }
    }

    private shouldConvert(currencyTo: Currency, data: CurrencyModel): boolean {
        const { currency, amount } = data ?? {};
        const hasAmount = amount != undefined;

        return currencyTo && currency && hasAmount;
    }
}