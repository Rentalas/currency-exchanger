import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule }   from '@angular/common/http'

import { AppComponent } from './app.component';
import { CurrencyConvertatorComponent } from './currency-convertator/currency-convertator.component';
import { ConverterInputComponent } from './converter-input/converter-input.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyConvertatorComponent,
    ConverterInputComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
