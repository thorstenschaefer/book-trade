"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var angularfire2_1 = require('angularfire2');
var _1 = require('./app/');
if (_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.bootstrap(_1.BookTradeAppComponent, [
    http_1.HTTP_PROVIDERS,
    angularfire2_1.FIREBASE_PROVIDERS,
    angularfire2_1.defaultFirebase('https://book-trade.firebaseio.com'),
    angularfire2_1.firebaseAuthConfig({
        provider: angularfire2_1.AuthProviders.Password,
        method: angularfire2_1.AuthMethods.Password
    })
]);
//# sourceMappingURL=main.js.map