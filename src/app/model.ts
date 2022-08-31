export interface CurrencyModel {
    currency: Currency,
    amount: number;
}

export enum Currency {
    Usd = 'USD',
    Eur = 'EUR',
    Uah = 'UAH',
}

export type CurrencyRates = Record<string, number>;

export interface CurrencyResponse {
    rate: number;
    cc: string;
    exchangedate: string;
}