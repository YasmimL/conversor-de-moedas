import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { AppComponent } from './app.component';
import { CardBodyComponent } from './components/card-body/card-body.component';
import { CardErrorComponent } from './components/card-error/card-error.component';
import { CardLoadingComponent } from './components/card-loading/card-loading.component';
import { CardComponent } from './components/card/card.component';
import { CardsComponent } from './components/cards/cards.component';
import { HeaderComponent } from './components/header/header.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CardComponent,
    CardBodyComponent,
    CardErrorComponent,
    CardLoadingComponent,
    CardsComponent,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
