/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, HostBinding, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { convertToBoolProperty } from '../helpers';
/**
 * Specific tab container.
 */
var NbTabComponent = /** @class */ (function () {
    function NbTabComponent() {
        this.activeValue = false;
        this.init = false;
    }
    Object.defineProperty(NbTabComponent.prototype, "active", {
        get: /**
           * Specifies active tab
           * @returns {boolean}
           */
        function () {
            return this.activeValue;
        },
        set: function (val) {
            this.activeValue = convertToBoolProperty(val);
            if (this.activeValue) {
                this.init = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbTabComponent.prototype, "lazyLoad", {
        set: /**
           * Lazy load content before tab selection
           * @param {boolean} val
           */
        function (val) {
            this.init = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    NbTabComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-tab',
                    template: "\n    <ng-container *ngIf=\"init\">\n      <ng-content></ng-content>\n    </ng-container>\n  ",
                },] },
    ];
    /** @nocollapse */
    NbTabComponent.propDecorators = {
        "tabTitle": [{ type: Input },],
        "route": [{ type: Input },],
        "activeValue": [{ type: HostBinding, args: ['class.content-active',] },],
        "active": [{ type: Input },],
        "lazyLoad": [{ type: Input },],
        "badgeText": [{ type: Input },],
        "badgeStatus": [{ type: Input },],
        "badgePosition": [{ type: Input },],
    };
    return NbTabComponent;
}());
export { NbTabComponent };
// TODO: Combine tabset with route-tabset, so that we can:
// - have similar interface
// - easy to migrate from one to another
// - can mix them both (route/content tab)
/**
 *
 * Dynamic tabset component.
 * Renders `<nb-tab></ng-tab> containers inside.
 *
 * @example Basic tabset example
 *
 * ```
 * <nb-tabset>
 *  <nb-tab tabTitle="Simple Tab #1">
 *    Tab content 1
 *  </nb-tab>
 *  <nb-tab tabTitle="Simple Tab #2">
 *    Tab content 2
 *  </nb-tab>
 * </nb-tabset>
 *
 * @styles
 *
 * tabs-font-family:
 * tabs-font-size:
 * tabs-content-font-family:
 * tabs-content-font-size:
 * tabs-active-bg:
 * tabs-active-font-weight:
 * tabs-padding:
 * tabs-content-padding:
 * tabs-header-bg:
 * tabs-separator:
 * tabs-fg:
 * tabs-fg-text:
 * tabs-fg-heading:
 * tabs-bg:
 * tabs-selected:
 *
 ```
 */
var NbTabsetComponent = /** @class */ (function () {
    function NbTabsetComponent(route) {
        this.route = route;
        this.fullWidthValue = false;
        /**
           * Emits when tab is selected
           * @type EventEmitter<any>
           */
        this.changeTab = new EventEmitter();
    }
    Object.defineProperty(NbTabsetComponent.prototype, "fullWidth", {
        set: /**
           * Take full width of a parent
           * @param {boolean} val
           */
        function (val) {
            this.fullWidthValue = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    NbTabsetComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.route.params
            .subscribe(function (params) {
            var activeTab = _this.tabs.find(function (tab) { return _this.routeParam ? tab.route === params[_this.routeParam] : tab.active; });
            _this.selectTab(activeTab || _this.tabs.first);
        });
    };
    // TODO: navigate to routeParam
    // TODO: navigate to routeParam
    NbTabsetComponent.prototype.selectTab = 
    // TODO: navigate to routeParam
    function (selectedTab) {
        this.tabs.forEach(function (tab) { return tab.active = tab === selectedTab; });
        this.changeTab.emit(selectedTab);
    };
    NbTabsetComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-tabset',
                    styles: [":host{display:block}:host.full-width ul{justify-content:space-around}:host /deep/ nb-tab{flex:1;-ms-flex:1 1 auto;overflow:auto;display:none}:host /deep/ nb-tab.content-active{display:block}ul{display:flex;flex-direction:row;list-style-type:none;margin:0}ul li{cursor:pointer;margin-bottom:-1px;text-align:center;position:relative}ul li.active a::before{display:block}ul li a{position:relative;text-decoration:none;display:inline-block}ul li a::before{display:none;position:absolute;content:'';width:100%;height:6px;border-radius:3px;bottom:-2px;left:0} "],
                    template: "\n    <ul>\n      <li *ngFor=\"let tab of tabs\"\n          (click)=\"selectTab(tab)\"\n          [class.active]=\"tab.active\">\n        <a href (click)=\"$event.preventDefault()\">{{ tab.tabTitle }}</a>\n        <nb-badge *ngIf=\"tab.badgeText\"\n          [text]=\"tab.badgeText\"\n          [status]=\"tab.badgeStatus\"\n          [position]=\"tab.badgePosition\">\n        </nb-badge>\n      </li>\n    </ul>\n    <ng-content select=\"nb-tab\"></ng-content>\n  ",
                },] },
    ];
    /** @nocollapse */
    NbTabsetComponent.ctorParameters = function () { return [
        { type: ActivatedRoute, },
    ]; };
    NbTabsetComponent.propDecorators = {
        "tabs": [{ type: ContentChildren, args: [NbTabComponent,] },],
        "fullWidthValue": [{ type: HostBinding, args: ['class.full-width',] },],
        "fullWidth": [{ type: Input },],
        "routeParam": [{ type: Input },],
        "changeTab": [{ type: Output },],
    };
    return NbTabsetComponent;
}());
export { NbTabsetComponent };
//# sourceMappingURL=tabset.component.js.map