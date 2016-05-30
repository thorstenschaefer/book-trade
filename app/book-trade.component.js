"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var _book_1 = require('./+book');
var _books_1 = require('./+books');
var _home_1 = require('./+home');
var _signup_1 = require('./+signup');
var _user_1 = require('./+user');
var book_1 = require('./book');
var book_list_component_1 = require('./book-list/book-list.component');
var user_1 = require('./user');
var header_component_1 = require('./header/header.component');
var BookTradeAppComponent = (function () {
    function BookTradeAppComponent() {
    }
    BookTradeAppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'book-trade-app',
            templateUrl: 'book-trade.component.html',
            directives: [router_1.ROUTER_DIRECTIVES, book_list_component_1.BookListComponent, header_component_1.HeaderComponent],
            providers: [router_1.ROUTER_PROVIDERS, book_1.BookService, user_1.UserService]
        }),
        router_1.Routes([
            { path: '/', component: _home_1.HomeComponent },
            { path: '/book/:bookId', component: _book_1.BookComponent },
            { path: '/books', component: _books_1.BooksComponent },
            { path: '/signup', component: _signup_1.SignupComponent },
            { path: '/user/:userId', component: _user_1.UserComponent }
        ]), 
        __metadata('design:paramtypes', [])
    ], BookTradeAppComponent);
    return BookTradeAppComponent;
}());
exports.BookTradeAppComponent = BookTradeAppComponent;
//# sourceMappingURL=book-trade.component.js.map