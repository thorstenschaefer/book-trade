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
/**
 * Pipe that shortens longer paragraphs to a maximum length.
 * The pipe tries to select the first n sentences (separated by a dot)
 * that together fits the specified maximum number of characters.
 * If no sentence can be found within the limit of characters, we just
 * cut the string to it's maximum number of characters allowed.
 */
var Shorten = (function () {
    function Shorten() {
    }
    Shorten.prototype.transform = function (value, characters) {
        if (!value || value.length < characters)
            return value;
        var shortened = value.substr(0, characters);
        var lastSentenceEnding = shortened.lastIndexOf('.');
        if (lastSentenceEnding >= 0) {
            shortened = shortened.substr(0, lastSentenceEnding + 1);
        }
        return shortened;
    };
    Shorten = __decorate([
        core_1.Pipe({
            name: 'shorten'
        }), 
        __metadata('design:paramtypes', [])
    ], Shorten);
    return Shorten;
}());
exports.Shorten = Shorten;
//# sourceMappingURL=shorten.pipe.js.map