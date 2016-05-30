import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import 'underscore';
declare let _;

import { Book } from './book';
import { User, UserService } from '../user';
import { TradeRequest } from './trade-request';

const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';

@Injectable()
export class BookService {
  
  public allTradeRequests:FirebaseListObservable<TradeRequest[]>;
  public allBooks:FirebaseListObservable<Book[]>;
  
  public userBooks:Observable<Book[]>;
  
  constructor(
    private http:Http,
    private af:AngularFire,
    private userService:UserService
  ) {
    this.allTradeRequests = <FirebaseListObservable<TradeRequest[]>>this.af.list('/traderequests');
    this.allBooks = this.af.list('/books');
    userService.user.subscribe(user => this.userBooks = (user === null ? null : this.allBooks.map(books => books.filter(book => book.owner === user.id))));
  }

  findBooks(query:string):Observable<Book[]> {
    console.log("Finding books using query: " + query);
    if (!query || query.length === 0) {
      return Observable.of([]);
    }

    let search = new URLSearchParams()
    search.set('q', query);

    return this.http.get(GOOGLE_BOOKS_API, { search } )
      .map(response => response.json())
      .map(object => object.items)
      .map(array => array.map(bookInfo => bookInfo.volumeInfo))
      .map(array => array.map(bookInfo => <Book>_.pick(bookInfo, 'id', 'authors', 'title', 'subtitle', 'language', 'description', 'pageCount', 'imageLinks')));    
  }
  
  getBooksOfUser(userId: string): Observable<Book[]> {
    console.log("Retrieving books of user..." + userId);
    if (!userId || userId.length === 0)
      return Observable.of([]);
      console.log("returning user book list");
    return this.userBooks;
  }
  
  getBook(id:string):Observable<Book> {
    return this.af.object('/books/' + id);
  }


  deleteBook(user:User, book:Book) {
    console.log("Deleting book " + book.title + " from user " + user.name);
    if (this.userBooks === null) {
      console.warn("User " + user.name + " not logged in");
      return;
    }
    
    this.allBooks.remove(book);
  }
  
  addBook(user:User, book:Book) {
    console.log("Adding book " + book.title + " to user " + user.name);
    if (this.userBooks === null) {
      console.warn("User " + user.name + " not logged in");
      return;
    }
    
    book.owner = user.id; // add an owner reference
    console.log("pushing book to general book list");
    this.allBooks.push(book);    
  }
  
  addTradeRequest(tradeRequest:TradeRequest) {
    this.allTradeRequests.push(tradeRequest);
  }
  
  getTradeRequestsFrom(user:User):Observable<TradeRequest[]> {
    return user === null ? Observable.of([]) : this.allTradeRequests.map(requests => requests.filter(request => request.requesterId === user.id));
  }
  getTradeRequestsBy(user:User):Observable<TradeRequest[]> {
    return user === null ? Observable.of([]) : this.allTradeRequests.map(requests => requests.filter(request => request.ownerId === user.id && request.status === 'new'));
  }

  updateRequestStatus(request:TradeRequest, newStatus:string) {
    this.af.object('/traderequests/' + request.$key).update({status:newStatus});
  }
}
