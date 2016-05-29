import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Book } from '../book';
import { Shorten } from '../shorten.pipe';
import { ArrayConcat } from '../array-concat.pipe';

@Component({
  moduleId: module.id,
  selector: 'app-book-list',
  templateUrl: 'book-list.component.html',
  styles: ['.book { cursor:pointer }'],
  pipes: [Shorten, ArrayConcat]
})
export class BookListComponent implements OnInit {

  @Input() books:Book[];
  @Output() bookSelected = new EventEmitter();
  
  constructor() {}

  ngOnInit() {
  }

  getAuthors(book:Book):string {
    if (!book)
      return "";
    if (!book.authors)
      return "Unknown authors";
    return book.authors.reduce((prev, current) => prev + ", " + current);
  }
  
  onClick(book:Book) {
    if (!book)
      return;
    console.log("Selected book " + JSON.stringify(book));
    this.bookSelected.emit(book);
  }
}
