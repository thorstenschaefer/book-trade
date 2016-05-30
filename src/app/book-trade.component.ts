import { Component } from '@angular/core';
import { UserComponent } from './+user';
import { Router, Routes , ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import { SettingsComponent } from './+settings';
import { SignupComponent } from './+signup';
import { BookComponent } from './+book';
import { HomeComponent } from './+home';
import { BooksComponent } from './+books';

// import { AlertComponent } from 'ng2-bootstrap/components/alert/alert.component';

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
  
  //   public alerts:Array<Object> = [
  //   {
  //     type: 'danger',
  //     msg: 'Oh snap! Change a few things up and try submitting again.'
  //   },
  //   {
  //     type: 'success',
  //     msg: 'Well done! You successfully read this important alert message.',
  //     closable: true
  //   }
  // ];

  // public closeAlert(i:number):void {
  //   this.alerts.splice(i, 1);
  // }

  // public addAlert():void {
  //   this.alerts.push({msg: 'Another alert!', type: 'warning', closable: true});
  // }
  
  // public gotoBookDetails(book:Book) {
  //   console.log("need to navigate to book: " + JSON.stringify(book));
  //   this.router.navigate(['/book/', book["$key"]]);
  // }
}
