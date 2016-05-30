import { Component, OnInit } from '@angular/core';

import { Book } from '../book';
import { BookService } from '../book';

@Component({
  moduleId: module.id,
  selector: 'app-book-form',
  templateUrl: 'book-form.component.html'
})
export class BookFormComponent implements OnInit {

  private books:Book;
  
  constructor(private bookService:BookService) {}

  ngOnInit() {
    
  }

}
