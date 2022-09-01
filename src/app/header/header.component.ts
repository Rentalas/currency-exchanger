import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrencyCourseService } from '../currency-course.service';
import { Currency, CurrencyRates } from '../model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currencies!: Currency[];
  currencyRates!: CurrencyRates;
  exchangeDate!: string;
  private dateSubscription!: Subscription;
  private currencySubscription!: Subscription;

  constructor(private courseService: CurrencyCourseService) { }

  ngOnInit(): void {
    this.currencies = [Currency.Eur, Currency.Usd];
    this.dateSubscription = this.courseService.exchangeDate$.subscribe(date => this.exchangeDate = date);
    this.currencySubscription = this.courseService.currencyRates$.subscribe(rates => this.currencyRates = rates);
  }

  ngOnDestroy() {
    this.dateSubscription.unsubscribe();
    this.currencySubscription.unsubscribe();
  }

}
