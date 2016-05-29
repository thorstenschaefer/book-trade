import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { UserService } from '../user';
import { BookListComponent } from '../book-list/book-list.component';
import { Book, BookService } from '../book';
import { CarouselComponent } from 'ng2-bootstrap/components/carousel/carousel.component';
import { SlideComponent } from 'ng2-bootstrap/components/carousel/slide.component';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styles: [`.carousel-control .left { background-image:none, background-color:green }`],
  directives: [ROUTER_DIRECTIVES, BookListComponent, CarouselComponent, SlideComponent]
})
export class HomeComponent implements OnInit {

  books:Book[] = [];

  constructor(
    private userService:UserService,
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
