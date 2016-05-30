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
var user_1 = require('../user');
var router_1 = require('@angular/router');
var HeaderComponent = (function () {
    function HeaderComponent(router, userService) {
        var _this = this;
        this.router = router;
        this.userService = userService;
        // userService.loggedIn.subscribe(v => this.loggedIn = v);
        userService.user.subscribe(function (v) {
            _this.loggedIn = v !== null;
            _this.user = v;
        });
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent.prototype.logout = function () {
        this.userService.logout();
        this.router.navigate(['/books']);
    };
    HeaderComponent.prototype.login = function (email, password) {
        var _this = this;
        var promise = this.userService.login(email, password);
        // after successful login, redirect to user page
        promise.then(function (value) {
            // console.log("login PROMISE.THEN");
            _this.router.navigate(['/user/', value.uid]); //, 'user', value.password.email]);
        }).catch(function (reason) { return alert(reason); });
    };
    HeaderComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-header',
            templateUrl: 'header.component.html',
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_1.Router, user_1.UserService])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map