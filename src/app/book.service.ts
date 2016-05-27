import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import 'underscore';
declare let _;

import { Book } from './book';
import { User } from './user';
import { UserService } from './user.service';

const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';

@Injectable()
export class BookService {
  
  public allBooks:FirebaseListObservable<Book[]>;
  private userBooks:FirebaseListObservable<Book[]>;
  
  constructor(
    private http:Http,
    private af:AngularFire,
    private userService:UserService
  ) {
    console.log("INIT BOOK SERVCIE")
    this.allBooks = this.af.list('/books');
    console.log("goot book list");
    userService.getUser().subscribe(user => this.userBooks = this.getBookListOfUser(user));
    console.log("DONE INIT BOOK SERVCIE")
  }

  private getBookListOfUser(user:User) {
    console.log("getting user books for " + JSON.stringify(user));
    if (user === null)
      return null;
    console.log("retrieving user books for user " + JSON.stringify(user));
    return this.af.list('/users/' + user.id + '/books');
      
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
  
  // getAllBooks(): Observable<Book[]> {
  //   console.log("Retrieving all books");
  //   return this.af.list('/books');
  // }
  
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
  
  addBook(user:User, book:Book) {
    console.log("Adding book " + book.title + " to user " + user.name);
    if (this.userBooks === null) {
      console.warn("User " + user.name + " not logged in");
      return;
    }
    
    console.log("pushing book to general book list");
    this.allBooks.push(book);
    console.log("pushing book to user book list");
    this.userBooks.push(book);
    // 
    // this.userService.user.
    
    // this.userService.getAuthentication().subscribe(
    //   user => {
    //     if (user === null)
    //       return;
        
    //     console.log("TODO: Adding book " + book.title + " for user " + user.id);
    //     let key = this.books.push(book).key();
    //     console.log(key);
        
    //     // TODO
    //     this.userService.getUserData().subscribe(r => console.log(r));
    //   }
    // );

    // this.af.database("/")
  }
}
