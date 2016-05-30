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
var user_1 = require('../user');
var book_list_component_1 = require('../book-list/book-list.component');
var book_1 = require('../book');
var BooksComponent = (function () {
    function BooksComponent(userService, bookService, router) {
        var _this = this;
        this.userService = userService;
        this.bookService = bookService;
        this.router = router;
        this.books = [];
        this.bookService.allBooks.subscribe(function (books) { return _this.books = books; });
    }
    BooksComponent.prototype.ngOnInit = function () {
    };
    BooksComponent.prototype.gotoBookDetails = function (book) {
        this.router.navigate(['/book/', book["$key"]]);
    };
    BooksComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-books',
            templateUrl: 'books.component.html',
            directives: [router_1.ROUTER_DIRECTIVES, book_list_component_1.BookListComponent]
        }), 
        __metadata('design:paramtypes', [user_1.UserService, book_1.BookService, router_1.Router])
    ], BooksComponent);
    return BooksComponent;
}());
exports.BooksComponent = BooksComponent;
//# sourceMappingURL=books.component.js.map