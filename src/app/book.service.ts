import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import 'underscore';
declare let _;

import { Book } from './book';

const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';

@Injectable()
export class BookService {

  constructor(
    private http:Http
  ) {
  }


  findBooks(query:string):Observable<Book[]> {
    if (!query || query.length === 0) {
      return Observable.of([]);
    }

    let search = new URLSearchParams()
    search.set('q', query);

    return this.http.get(GOOGLE_BOOKS_API, { search } )
      .map(response => response.json())
      .map(object => object.items)
      .map(array => array.map(bookInfo => bookInfo.volumeInfo))
      .map(array => array.map(bookInfo => <Book>_.pick(bookInfo, 'authors', 'title', 'subtitle', 'language', 'description', 'pageCount', 'imageLinks')));    
  }
}
