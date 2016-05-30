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
var common_1 = require('@angular/common');
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/distinctUntilChanged');
require('rxjs/add/operator/switchMap');
var router_1 = require('@angular/router');
var user_1 = require('../user');
var book_1 = require('../book');
var book_list_component_1 = require('../book-list/book-list.component');
var bootstrap_panel_1 = require('../bootstrap-panel');
var UserComponent = (function () {
    function UserComponent(userService, bookService) {
        this.userService = userService;
        this.bookService = bookService;
        this.searchBook = new common_1.Control();
        this.searchBooksResults = [];
        this.queryUnderway = false;
        this.showProfile = false;
        this.name = new common_1.Control();
        this.city = new common_1.Control();
        this.state = new common_1.Control();
    }
    UserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.user
            .subscribe(function (u) {
            _this.user = u;
            _this.books = _this.bookService.userBooks;
            _this.bookService.getTradeRequestsFrom(u).subscribe(function (r) { return _this.requestsFromMe = r; });
            _this.bookService.getTradeRequestsBy(u).subscribe(function (r) { return _this.requestsByMe = r; });
            _this.setControlValues();
        });
        this.searchBook
            .valueChanges
            .map(function (e) { _this.queryUnderway = true; return e; })
            .debounceTime(400)
            .distinctUntilChanged()
            .switchMap(function (query) { return _this.bookService.findBooks(query); })
            .subscribe(function (r) { console.log("got result: " + r); _this.queryUnderway = false; _this.searchBooksResults = r; });
    };
    UserComponent.prototype.deleteBook = function (book) {
        this.bookService.deleteBook(this.user, book);
    };
    UserComponent.prototype.addBook = function (book) {
        this.bookService.addBook(this.user, book);
        this.searchBook.updateValue("");
    };
    UserComponent.prototype.toggleProfile = function () {
        this.showProfile = !this.showProfile;
    };
    UserComponent.prototype.saveProfile = function () {
        this.toggleProfile();
        this.user.name = this.name.value;
        this.user.city = this.city.value;
        this.user.state = this.state.value;
        this.userService.updateUserData(this.user);
    };
    UserComponent.prototype.cancel = function () {
        this.toggleProfile();
        this.setControlValues();
    };
    UserComponent.prototype.setControlValues = function () {
        this.name.updateValue(this.user ? this.user.name : "");
        this.city.updateValue(this.user ? this.user.city : "");
        this.state.updateValue(this.user ? this.user.state : "");
    };
    UserComponent.prototype.acceptRequest = function (request) {
        this.bookService.updateRequestStatus(request, 'accepted');
    };
    UserComponent.prototype.declineRequest = function (request) {
        this.bookService.updateRequestStatus(request, 'decline');
    };
    UserComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-user',
            templateUrl: 'user.component.html',
            directives: [book_list_component_1.BookListComponent, bootstrap_panel_1.BS_PANEL_DIRECTIVES, router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [user_1.UserService, book_1.BookService])
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map