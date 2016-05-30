import { Component, OnInit } from '@angular/core';
import { Control } from '@angular/common';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { ROUTER_DIRECTIVES} from '@angular/router';

import { User, UserService } from '../user';
import { Book, BookService, TradeRequest } from '../book';
import { BookListComponent } from '../book-list/book-list.component';
import { BS_PANEL_DIRECTIVES } from '../bootstrap-panel';


@Component({
  moduleId: module.id,
  selector: 'app-user',
  templateUrl: 'user.component.html',
  directives: [BookListComponent, BS_PANEL_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class UserComponent implements OnInit {

  private user:User;
  private books:Observable<Book[]>;
  
  private requestsFromMe:TradeRequest[];
  private requestsByMe:TradeRequest[];
  
  
  private searchBook = new Control();
  private searchBooksResults:Book[] = [];
  private queryUnderway:boolean = false;
  
  private showProfile:boolean = false;
  private name = new Control();
  private city = new Control();
  private state = new Control();
  
  
  constructor(private userService:UserService, private bookService:BookService) { }

  ngOnInit() {
    this.userService.user
      .subscribe(u => {
        this.user = u;
        this.books = this.bookService.userBooks;
        this.bookService.getTradeRequestsFrom(u).subscribe(r => this.requestsFromMe = r);
        this.bookService.getTradeRequestsBy(u).subscribe(r => this.requestsByMe = r);
        this.setControlValues();
      });
       
    this.searchBook
      .valueChanges
      .map(e => { this.queryUnderway = true; return e })
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(query => this.bookService.findBooks(query))
      .subscribe(r => { console.log("got result: " + r); this.queryUnderway = false; this.searchBooksResults = r });
  }

  deleteBook(book:Book) {
    this.bookService.deleteBook(this.user, book);
  }
  addBook(book:Book) {
    this.bookService.addBook(this.user, book);
    this.searchBook.updateValue("");
  }
  
  private toggleProfile() {
    this.showProfile = !this.showProfile;
  }
  
  private saveProfile() {
    this.toggleProfile();
    this.user.name = this.name.value;
    this.user.city = this.city.value;
    this.user.state = this.state.value;
    this.userService.updateUserData(this.user);
  }
  
  private cancel() {
    this.toggleProfile();
    this.setControlValues();
  }
  
  private setControlValues() {
    this.name.updateValue(this.user ? this.user.name : "");
    this.city.updateValue(this.user ? this.user.city : "");
    this.state.updateValue(this.user ? this.user.state : "");
  }
  
  private acceptRequest(request:TradeRequest) {
    this.bookService.updateRequestStatus(request, 'accepted')
  }
  
  private declineRequest(request:TradeRequest) {
    this.bookService.updateRequestStatus(request, 'decline')
  }
}
