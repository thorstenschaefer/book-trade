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
var bs_header_component_1 = require('./bs-header.component');
var bs_body_component_1 = require('./bs-body.component');
var bs_footer_component_1 = require('./bs-footer.component');
var BootstrapPanelComponent = (function () {
    function BootstrapPanelComponent() {
        this.contextType = "default";
    }
    BootstrapPanelComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.ContentChild(bs_header_component_1.BootstrapHeaderComponent), 
        __metadata('design:type', Object)
    ], BootstrapPanelComponent.prototype, "header", void 0);
    __decorate([
        core_1.ContentChild(bs_body_component_1.BootstrapBodyComponent), 
        __metadata('design:type', Object)
    ], BootstrapPanelComponent.prototype, "body", void 0);
    __decorate([
        core_1.ContentChild(bs_footer_component_1.BootstrapFooterComponent), 
        __metadata('design:type', Object)
    ], BootstrapPanelComponent.prototype, "footer", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BootstrapPanelComponent.prototype, "contextType", void 0);
    BootstrapPanelComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'bs-panel',
            templateUrl: 'bs-panel.component.html',
            directives: [bs_header_component_1.BootstrapHeaderComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], BootstrapPanelComponent);
    return BootstrapPanelComponent;
}());
exports.BootstrapPanelComponent = BootstrapPanelComponent;
//# sourceMappingURL=bs-panel.component.js.map