import { Component, OnInit } from '@angular/core';
import { Control } from '@angular/common';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { User, UserService } from '../user';
import { Book, BookService } from '../book';
import { BookListComponent } from '../book-list/book-list.component';
@Component({
  moduleId: module.id,
  selector: 'app-user',
  templateUrl: 'user.component.html',
  directives: [BookListComponent]
})
export class UserComponent implements OnInit {

  private user:User;
  private books:Observable<Book[]>;
  
  private searchBook = new Control();
  private searchBooksResults:Book[] = [];
  private queryUnderway:boolean = false;
  
  constructor(private userService:UserService, private bookService:BookService) {
    console.log("COMP user constructor: subscribing to changes");
    
    this.userService.user.subscribe(
      value =>console.log("COMP user: single test sub of user" + value), 
      error => console.log("COMP user: single test sub error " + error),
      () => console.log("COMP user: complete")
    );
    
    this.userService.user
      .subscribe(u => {
        console.log("COMP user: user is " + u + ". setting user and books");
        this.user = u;
        this.books = this.bookService.userBooks;
        console.log("COMP user: new user: " + this.user);
      });
  }

  ngOnInit() {
    console.log("COMP user: user component on init");
    console.log("COMP user: current user: " + this.user);
       
    this.searchBook
      .valueChanges
      .map(e => { this.queryUnderway = true; return e })
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(query => this.bookService.findBooks(query))
      .subscribe(r => { console.log("got result: " + r); this.queryUnderway = false; this.searchBooksResults = r });
  }


  addBook(book:Book) {
    this.bookService.addBook(this.user, book);
    this.searchBook.updateValue("");
  }
}
