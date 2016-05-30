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
var shorten_pipe_1 = require('../shorten.pipe');
var array_concat_pipe_1 = require('../array-concat.pipe');
var pagination_component_1 = require('ng2-bootstrap/components/pagination/pagination.component');
var BookListComponent = (function () {
    function BookListComponent() {
        this.pageSize = 10;
        this.bookSelected = new core_1.EventEmitter();
        this.totalItems = 0;
        this.currentPage = 1;
        this.needsPagination = false;
    }
    BookListComponent.prototype.ngOnInit = function () {
    };
    BookListComponent.prototype.ngOnChanges = function () {
        this.totalItems = this.books.length;
        this.needsPagination = this.totalItems > 10;
        this.pageChanged({ page: 1 });
    };
    BookListComponent.prototype.onClick = function (book) {
        if (!book)
            return;
        this.bookSelected.emit(book);
    };
    BookListComponent.prototype.pageChanged = function (pageChangeEvent) {
        var page = pageChangeEvent.page;
        this.pagedBooks = this.books.slice(10 * (page - 1), 10 * page);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], BookListComponent.prototype, "books", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], BookListComponent.prototype, "pageSize", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BookListComponent.prototype, "bookSelected", void 0);
    BookListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-book-list',
            templateUrl: 'book-list.component.html',
            styles: ['.book { cursor:pointer }'],
            directives: [pagination_component_1.PaginationComponent],
            pipes: [shorten_pipe_1.Shorten, array_concat_pipe_1.ArrayConcat]
        }), 
        __metadata('design:paramtypes', [])
    ], BookListComponent);
    return BookListComponent;
}());
exports.BookListComponent = BookListComponent;
//# sourceMappingURL=book-list.component.js.map