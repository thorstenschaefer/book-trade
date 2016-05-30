import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { UserService } from '../user';
import { BookListComponent } from '../book-list/book-list.component';
import { Book, BookService } from '../book';
import { CarouselComponent } from 'ng2-bootstrap/components/carousel/carousel.component';
import { SlideComponent } from 'ng2-bootstrap/components/carousel/slide.component';

// import { BS_PANEL_DIRECTIVES } from '../bootstrap-panel';

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
  encapsulation: ViewEncapsulation.None,  // Use to disable CSS Encapsulation for this component
  directives: [ROUTER_DIRECTIVES, BookListComponent, CarouselComponent, SlideComponent]
})
export class HomeComponent implements OnInit {

  books:Book[] = [];
  mostRecentBooks:Book[] = [];
  
  // need to declare the enum to use it in html...
  // private contextType = ContextType;
  
  constructor(
    private userService:UserService,
    private bookService:BookService,
    private router:Router
  ) {
    this.bookService.allBooks.subscribe(books => {
      this.books = books;
      this.mostRecentBooks = books.slice(-5).reverse();
    });
  }

  ngOnInit() {
  }

  public gotoBookDetails(book:Book) {
    console.log("need to navigate to book: " + JSON.stringify(book));
    this.router.navigate(['/book/', book["$key"]]);
  }

}
