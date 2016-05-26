import { Component, OnInit } from '@angular/core';
import { Control } from '@angular/common';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { UserService } from '../user.service';
import { BookService } from '../book.service';
import { User } from '../user';
import { Book } from '../book';
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
  
  constructor(private userService:UserService, private bookService:BookService) {}

  ngOnInit() {
    this.userService.getAuthentication()
      .subscribe(u => {
        this.user = u;
        this.books = this.bookService.getBooksOfUser(u.id);
      });
       
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
