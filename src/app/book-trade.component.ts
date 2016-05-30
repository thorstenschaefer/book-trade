import { Component } from '@angular/core';
import { UserComponent } from './+user';
import { Router, Routes , ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import { SettingsComponent } from './+settings';
import { SignupComponent } from './+signup';
import { BookComponent } from './+book';
import { HomeComponent } from './+home';
import { BooksComponent } from './+books';


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
  {path: '/user/:userId', component: UserComponent},
  {path: '/settings', component: SettingsComponent},
  {path: '/signup', component: SignupComponent},
  {path: '/book/:bookId', component: BookComponent},
  {path: '/', component: HomeComponent},
  {path: '/books', component: BooksComponent}
])
export class BookTradeAppComponent {

  
  
  constructor(
    // private router:Router
  ) {
  }
}
