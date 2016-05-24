export class BookTradePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('book-trade-app h1')).getText();
  }
}
