import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { Book } from '../book';
import { Shorten } from '../shorten.pipe';
import { ArrayConcat } from '../array-concat.pipe';
import { PaginationComponent } from 'ng2-bootstrap/components/pagination/pagination.component';
@Component({
  moduleId: module.id,
  selector: 'app-book-list',
  templateUrl: 'book-list.component.html',
  styles: ['.book { cursor:pointer }'],
  directives: [PaginationComponent],
  pipes: [Shorten, ArrayConcat]
})
export class BookListComponent implements OnInit, OnChanges {

  @Input() books:Book[];
  @Input() pageSize:number = 10;
  @Output() bookSelected = new EventEmitter();
  
  private pagedBooks:Book[];
  private totalItems:number = 0;
  private currentPage:number = 1;
  private needsPagination:boolean = false;
  
  constructor() {}
  
  ngOnInit() {
  }

  ngOnChanges() {
    this.totalItems = this.books.length;
    this.needsPagination = this.totalItems > 10;
    this.pageChanged({page:1});
  }
  
  onClick(book:Book) {
    if (!book)
      return;
    this.bookSelected.emit(book);
  }
  
  pageChanged(pageChangeEvent) {
    let page:number = pageChangeEvent.page;
    this.pagedBooks = this.books.slice(10*(page-1), 10*page);
  }
}
