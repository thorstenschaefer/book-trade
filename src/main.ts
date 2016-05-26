import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http'
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';

import { BookTradeAppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(BookTradeAppComponent, [
  HTTP_PROVIDERS,
  FIREBASE_PROVIDERS,
  defaultFirebase('https://book-trade.firebaseio.com')
]);
