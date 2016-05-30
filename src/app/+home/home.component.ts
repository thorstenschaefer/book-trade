import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { UserService } from '../user';
import { Book, BookService } from '../book';
import { CarouselComponent } from 'ng2-bootstrap/components/carousel/carousel.component';
import { SlideComponent } from 'ng2-bootstrap/components/carousel/slide.component';
import { BooksComponent } from '../+books';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styles: [`
  .carousel-control.left, .carousel-control.right{ 
    background: none !important; 
    filter: progid:none !important; 
  }
  `],
  encapsulation: ViewEncapsulation.None,  // Use to disable CSS Encapsulation for the carousel
  directives: [ROUTER_DIRECTIVES, BooksComponent, CarouselComponent, SlideComponent]
})
export class HomeComponent implements OnInit {

  mostRecentBooks:Book[] = [];
  
  constructor(
    private userService:UserService,
    private bookService:BookService
  ) {
    this.bookService.allBooks.subscribe(books => this.mostRecentBooks = books.slice(-5).reverse());
  }

  ngOnInit() {
  }
}
