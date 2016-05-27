import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BookListComponent } from '../book-list/book-list.component';
import { BookService } from '../book.service';
import { Book } from '../book';
import { CarouselComponent } from 'ng2-bootstrap/components/carousel/carousel.component';
import { SlideComponent } from 'ng2-bootstrap/components/carousel/slide.component';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styles: [`.carousel-control .left { background-image:none, background-color:green }`],
  directives: [BookListComponent, CarouselComponent, SlideComponent]
})
export class HomeComponent implements OnInit {

  books:Book[] = [];

  constructor(
    private bookService:BookService,
    private router:Router
  ) {
    this.bookService.allBooks.subscribe(books => this.books = books);
  }

  ngOnInit() {
  }

  public gotoBookDetails(book:Book) {
    console.log("need to navigate to book: " + JSON.stringify(book));
    this.router.navigate(['/book/', book["$key"]]);
  }

}
