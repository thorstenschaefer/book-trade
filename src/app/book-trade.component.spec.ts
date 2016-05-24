import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { BookTradeAppComponent } from '../app/book-trade.component';

beforeEachProviders(() => [BookTradeAppComponent]);

describe('App: BookTrade', () => {
  it('should create the app',
      inject([BookTradeAppComponent], (app: BookTradeAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'book-trade works!\'',
      inject([BookTradeAppComponent], (app: BookTradeAppComponent) => {
    expect(app.title).toEqual('book-trade works!');
  }));
});
