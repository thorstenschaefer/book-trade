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
  
  private books:FirebaseListObservable<Book[]>;
  
  constructor(
    private http:Http,
    private af:AngularFire,
    private userService:UserService
  ) {
    this.books = this.af.list('/books');
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
  
  getAllBooks(): Observable<Book[]> {
    return this.af.list('/books');
  }
  
  getBooksOfUser(userId: string): Observable<Book[]> {
    if (!userId || userId.length === 0)
      return Observable.of([]);
      
    // this.af.list('/users/books').subscribe(r => console.log(r));
    return null;
  }
  
  addBook(user:User, book:Book) {
    this.userService.getAuthentication().subscribe(
      user => {
        if (user === null)
          return;
        
        console.log("TODO: Adding book " + book.title + " for user " + user.id);
        let key = this.books.push(book).key();
        console.log(key);
        
        // TODO
        this.userService.getUserData().subscribe(r => console.log(r));
      }
    );

    // this.af.database("/")
  }
}
