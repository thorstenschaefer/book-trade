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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/observable/of');
var angularfire2_1 = require('angularfire2');
require('underscore');
var user_1 = require('../user');
var GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';
var BookService = (function () {
    function BookService(http, af, userService) {
        var _this = this;
        this.http = http;
        this.af = af;
        this.userService = userService;
        this.allTradeRequests = this.af.list('/traderequests');
        this.allBooks = this.af.list('/books');
        userService.user.subscribe(function (user) { return _this.userBooks = (user === null ? null : _this.allBooks.map(function (books) { return books.filter(function (book) { return book.owner === user.id; }); })); });
    }
    BookService.prototype.findBooks = function (query) {
        console.log("Finding books using query: " + query);
        if (!query || query.length === 0) {
            return Observable_1.Observable.of([]);
        }
        var search = new http_1.URLSearchParams();
        search.set('q', query);
        return this.http.get(GOOGLE_BOOKS_API, { search: search })
            .map(function (response) { return response.json(); })
            .map(function (object) { return object.items; })
            .map(function (array) { return array.map(function (bookInfo) { return bookInfo.volumeInfo; }); })
            .map(function (array) { return array.map(function (bookInfo) { return _.pick(bookInfo, 'id', 'authors', 'title', 'subtitle', 'language', 'description', 'pageCount', 'imageLinks'); }); });
    };
    BookService.prototype.getBooksOfUser = function (userId) {
        console.log("Retrieving books of user..." + userId);
        if (!userId || userId.length === 0)
            return Observable_1.Observable.of([]);
        console.log("returning user book list");
        return this.userBooks;
    };
    BookService.prototype.getBook = function (id) {
        return this.af.object('/books/' + id);
    };
    BookService.prototype.deleteBook = function (user, book) {
        console.log("Deleting book " + book.title + " from user " + user.name);
        if (this.userBooks === null) {
            console.warn("User " + user.name + " not logged in");
            return;
        }
        this.allBooks.remove(book);
    };
    BookService.prototype.addBook = function (user, book) {
        console.log("Adding book " + book.title + " to user " + user.name);
        if (this.userBooks === null) {
            console.warn("User " + user.name + " not logged in");
            return;
        }
        book.owner = user.id; // add an owner reference
        console.log("pushing book to general book list");
        this.allBooks.push(book);
    };
    BookService.prototype.addTradeRequest = function (tradeRequest) {
        this.allTradeRequests.push(tradeRequest);
    };
    BookService.prototype.getTradeRequestsFrom = function (user) {
        return user === null ? Observable_1.Observable.of([]) : this.allTradeRequests.map(function (requests) { return requests.filter(function (request) { return request.requesterId === user.id; }); });
    };
    BookService.prototype.getTradeRequestsBy = function (user) {
        return user === null ? Observable_1.Observable.of([]) : this.allTradeRequests.map(function (requests) { return requests.filter(function (request) { return request.ownerId === user.id && request.status === 'new'; }); });
    };
    BookService.prototype.updateRequestStatus = function (request, newStatus) {
        this.af.object('/traderequests/' + request.$key).update({ status: newStatus });
    };
    BookService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, angularfire2_1.AngularFire, user_1.UserService])
    ], BookService);
    return BookService;
}());
exports.BookService = BookService;
//# sourceMappingURL=book.service.js.map