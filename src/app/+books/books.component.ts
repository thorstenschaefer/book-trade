import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { UserService } from '../user';
import { BookListComponent } from '../book-list/book-list.component';
import { Book, BookService } from '../book';

@Component({
  moduleId: module.id,
  selector: 'app-books',
  templateUrl: 'books.component.html',
  directives: [ROUTER_DIRECTIVES, BookListComponent]
})
export class BooksComponent implements OnInit {

  books:Book[] = [];

  constructor(
    private userService:UserService,
    private bookService:BookService,
    private router:Router
  ) {
        this.bookService.allBooks.subscribe(books => this.books = books);
  }

  ngOnInit() {
  }
  
 public gotoBookDetails(book:Book) {
    console.log("need to navigate to book: " + JSON.stringify(book));
    this.router.navigate(['/book/', book["$key"]]);
  }
}
