import { Component, OnInit } from '@angular/core';
import { RouteSegment, ROUTER_DIRECTIVES } from '@angular/router';

import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  moduleId: module.id,
  selector: 'app-book',
  templateUrl: 'book.component.html',
  directives: [ROUTER_DIRECTIVES]
})
export class BookComponent implements OnInit {

  private book:Book
  constructor(private bookService:BookService) {}

  ngOnInit() {
  }
  
  routerOnActivate(curr: RouteSegment): void {
    let id = curr.getParam('bookId'); 
    this.bookService.getBook(id).subscribe(book => this.book = book);
  }
  
  getAuthors(book:Book):string {
    if (!book)
      return "";
    if (!book.authors)
      return "Unknown authors";
    return book.authors.reduce((prev, current) => prev + ", " + current);
  }

}
