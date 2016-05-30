import { Component } from '@angular/core';
import { Router, Routes , ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';

import { BookComponent } from './+book';
import { BooksComponent } from './+books';
import { HomeComponent } from './+home';
import { SignupComponent } from './+signup';
import { UserComponent } from './+user';


import { Book, BookService } from './book';
import { BookListComponent } from './book-list/book-list.component';
import { UserService } from './user';
import { HeaderComponent } from './header/header.component';

@Component({
  moduleId: module.id,
  selector: 'book-trade-app',
  templateUrl: 'book-trade.component.html',
  directives: [ROUTER_DIRECTIVES, BookListComponent, HeaderComponent],
  providers: [ROUTER_PROVIDERS, BookService, UserService]
})
@Routes([
  {path: '/', component: HomeComponent},
  {path: '/book/:bookId', component: BookComponent},
  {path: '/books', component: BooksComponent},
  {path: '/signup', component: SignupComponent},
  {path: '/user/:userId', component: UserComponent}
])
export class BookTradeAppComponent {

  
  
  constructor(
    // private router:Router
  ) {
  }
}
