import { BookTradePage } from './app.po';

describe('book-trade App', function() {
  let page: BookTradePage;

  beforeEach(() => {
    page = new BookTradePage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('book-trade works!');
  });
});
