import { Component, OnInit, Input, EventEmitter } from '@angular/core';

import { Book } from '../book';

@Component({
  moduleId: module.id,
  selector: 'app-book-list',
  templateUrl: 'book-list.component.html',
  styleUrls: ['book-list.component.css']
})
export class BookListComponent implements OnInit {

  @Input() books:Book[];
  
  constructor() {}

  ngOnInit() {
  }

  getAuthors(book:Book):string {
    return book.authors.reduce((prev, current) => prev + ", " + current);
  }
}
