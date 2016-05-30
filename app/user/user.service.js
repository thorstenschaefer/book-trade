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
var angularfire2_1 = require('angularfire2');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/switchMap');
require('rxjs/add/operator/share');
require('rxjs/add/observable/of');
var LOGIN_CONFIG = { provider: angularfire2_1.AuthProviders.Password, method: angularfire2_1.AuthMethods.Password };
var UserService = (function () {
    function UserService(af) {
        var _this = this;
        this.af = af;
        this.users = this.af.object('/users');
        this.user = this.af.auth.flatMap(function (auth) { return auth === null ? Observable_1.Observable.of(null) : _this.af.object('/users/' + auth.uid); });
        this.loggedIn = this.user.map(function (user) { return user !== null; });
    }
    UserService.prototype.login = function (email, password) {
        // console.log("Login called");
        return this.af.auth.login({ email: email, password: password }, LOGIN_CONFIG);
    };
    UserService.prototype.logout = function () {
        // console.log("Logout called");
        this.af.auth.logout();
    };
    UserService.prototype.getUser = function (id) {
        if (id == null)
            return Observable_1.Observable.of(null);
        return this.af.object('/users/' + id);
    };
    UserService.prototype.updateUserData = function (user) {
        // console.log("Updating user information " + JSON.stringify(user));
        var userData = this.af.object('/users/' + user.id);
        userData.update({ 'name': user.name, 'city': user.city, 'state': user.state });
    };
    UserService.prototype.signup = function (user) {
        var _this = this;
        // console.log("user.service: SIGNUP " + JSON.stringify(user));
        var promise = this.af.auth.createUser(user).then(function (newUser) {
            // console.log("new user created, storing it in the users collection");
            var userId = newUser.uid;
            user.id = userId;
            // console.warn("auth user " + JSON.stringify(user));
            _this.af.auth.login(user).then(function (auth) {
                var object = {};
                delete user.password;
                object[userId] = user;
                _this.users.update(object);
            });
        }).catch(function (e) { return console.error(e); });
        return promise;
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angularfire2_1.AngularFire])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map