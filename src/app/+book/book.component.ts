import { Component, OnInit } from '@angular/core';
import { RouteSegment, ROUTER_DIRECTIVES } from '@angular/router';

import { Book, BookService } from '../book';
import { User, UserService } from '../user';

@Component({
  moduleId: module.id,
  selector: 'app-book',
  templateUrl: 'book.component.html',
  directives: [ROUTER_DIRECTIVES]
})
export class BookComponent implements OnInit {

  private book:Book
  private owner:User;
  
  constructor(
    private bookService:BookService, 
    private userService:UserService
  ) { }

  ngOnInit() {
  }
  
  routerOnActivate(curr: RouteSegment): void {
    let id = curr.getParam('bookId'); 
    this.bookService.getBook(id).subscribe(book => {
      this.book = book;
      book === null ? this.owner = null : this.userService.getUser(book.owner).subscribe(user => this.owner = user);
    });
  }
  
  getAuthors(book:Book):string {
    if (!book)
      return "";
    if (!book.authors)
      return "Unknown authors";
    return book.authors.reduce((prev, current) => prev + ", " + current);
  }

}
