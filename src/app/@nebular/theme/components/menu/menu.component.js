/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, Input, Output, EventEmitter, HostBinding, ViewChildren, QueryList, ElementRef, PLATFORM_ID, Inject, ChangeDetectorRef, } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { takeWhile, filter } from 'rxjs/operators';
import { NbMenuInternalService, NbMenuService } from './menu.service';
import { convertToBoolProperty, getElementHeight } from '../helpers';
import { NB_WINDOW } from '../../theme.options';
function sumSubmenuHeight(item) {
    return item.expanded
        ? (item.subMenuHeight || 0) + item.children.filter(function (c) { return c.children; }).reduce(function (acc, c) { return acc + sumSubmenuHeight(c); }, 0)
        : 0;
}
var NbMenuItemComponent = /** @class */ (function () {
    function NbMenuItemComponent(menuService, platformId, changeDetection) {
        this.menuService = menuService;
        this.platformId = platformId;
        this.changeDetection = changeDetection;
        this.menuItem = null;
        this.hoverItem = new EventEmitter();
        this.toggleSubMenu = new EventEmitter();
        this.selectItem = new EventEmitter();
        this.itemClick = new EventEmitter();
        this.alive = true;
        this.maxHeight = 0;
    }
    NbMenuItemComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.subMenu.changes
            .pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function () {
            _this.updateSubmenuHeight();
            _this.updateMaxHeight();
        });
        this.menuService.onSubmenuToggle()
            .pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function () { return _this.updateMaxHeight(); });
        this.updateSubmenuHeight();
        this.updateMaxHeight();
        this.changeDetection.detectChanges();
    };
    NbMenuItemComponent.prototype.ngOnDestroy = function () {
        this.alive = false;
    };
    NbMenuItemComponent.prototype.updateSubmenuHeight = function () {
        if (isPlatformBrowser(this.platformId)) {
            this.menuItem.subMenuHeight = this.subMenu.reduce(function (acc, c) { return acc + getElementHeight(c.nativeElement); }, 0);
        }
    };
    NbMenuItemComponent.prototype.updateMaxHeight = function () {
        this.maxHeight = sumSubmenuHeight(this.menuItem);
    };
    NbMenuItemComponent.prototype.onToggleSubMenu = function (item) {
        this.toggleSubMenu.emit(item);
    };
    NbMenuItemComponent.prototype.onHoverItem = function (item) {
        this.hoverItem.emit(item);
    };
    NbMenuItemComponent.prototype.onSelectItem = function (item) {
        this.selectItem.emit(item);
    };
    NbMenuItemComponent.prototype.onItemClick = function (item) {
        this.itemClick.emit(item);
    };
    NbMenuItemComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: '[nbMenuItem]',
                    template: "<span *ngIf=\"menuItem.group\"> <i class=\"menu-icon {{ menuItem.icon }}\" *ngIf=\"menuItem.icon\"></i> {{ menuItem.title }} </span> <a *ngIf=\"menuItem.link && !menuItem.url && !menuItem.children && !menuItem.group\" [routerLink]=\"menuItem.link\" [queryParams]=\"menuItem.queryParams\" [fragment]=\"menuItem.fragment\" [attr.target]=\"menuItem.target\" [attr.title]=\"menuItem.title\" [class.active]=\"menuItem.selected\" (mouseenter)=\"onHoverItem(menuItem)\"> <i class=\"menu-icon {{ menuItem.icon }}\" *ngIf=\"menuItem.icon\"></i> <span class=\"menu-title\">{{ menuItem.title }}</span> </a> <a *ngIf=\"menuItem.url && !menuItem.children && !menuItem.link && !menuItem.group\" [attr.href]=\"menuItem.url\" [attr.target]=\"menuItem.target\" [attr.title]=\"menuItem.title\" [class.active]=\"menuItem.selected\" (mouseenter)=\"onHoverItem(menuItem)\" (click)=\"onSelectItem(menuItem)\"> <i class=\"menu-icon {{ menuItem.icon }}\" *ngIf=\"menuItem.icon\"></i> <span class=\"menu-title\">{{ menuItem.title }}</span> </a> <a *ngIf=\"!menuItem.children && !menuItem.link && !menuItem.url && !menuItem.group\" [attr.target]=\"menuItem.target\" [attr.title]=\"menuItem.title\" [class.active]=\"menuItem.selected\" (mouseenter)=\"onHoverItem(menuItem)\" (click)=\"$event.preventDefault(); onItemClick(menuItem);\"> <i class=\"menu-icon {{ menuItem.icon }}\" *ngIf=\"menuItem.icon\"></i> <span class=\"menu-title\">{{ menuItem.title }}</span> </a> <a *ngIf=\"menuItem.children\" (click)=\"$event.preventDefault(); onToggleSubMenu(menuItem);\" [attr.target]=\"menuItem.target\" [attr.title]=\"menuItem.title\" [class.active]=\"menuItem.selected\" (mouseenter)=\"onHoverItem(menuItem)\" href=\"#\"> <i class=\"menu-icon {{ menuItem.icon }}\" *ngIf=\"menuItem.icon\"></i> <span class=\"menu-title\">{{ menuItem.title }}</span> <i class=\"ion chevron\" [class.ion-chevron-left]=\"!menuItem.expanded\" [class.ion-chevron-down]=\"menuItem.expanded\"></i> </a> <ul *ngIf=\"menuItem.children\" [class.collapsed]=\"!(menuItem.children && menuItem.expanded)\" [class.expanded]=\"menuItem.expanded\" class=\"menu-items\" [style.max-height.px]=\"maxHeight\"> <ng-container *ngFor=\"let item of menuItem.children\"> <li nbMenuItem *ngIf=\"!item.hidden\" [menuItem]=\"item\" [class.menu-group]=\"item.group\" (hoverItem)=\"onHoverItem($event)\" (toggleSubMenu)=\"onToggleSubMenu($event)\" (selectItem)=\"onSelectItem($event)\" (itemClick)=\"onItemClick($event)\" class=\"menu-item\"> </li> </ng-container> </ul> ",
                },] },
    ];
    /** @nocollapse */
    NbMenuItemComponent.ctorParameters = function () { return [
        { type: NbMenuService, },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: ChangeDetectorRef, },
    ]; };
    NbMenuItemComponent.propDecorators = {
        "menuItem": [{ type: Input },],
        "hoverItem": [{ type: Output },],
        "toggleSubMenu": [{ type: Output },],
        "selectItem": [{ type: Output },],
        "itemClick": [{ type: Output },],
        "subMenu": [{ type: ViewChildren, args: [NbMenuItemComponent, { read: ElementRef },] },],
    };
    return NbMenuItemComponent;
}());
export { NbMenuItemComponent };
/**
 * Vertical menu component.
 *
 * Accepts a list of menu items and renders them accordingly. Supports multi-level menus.
 *
 * @example Basic usage
 *
 * ```
 * // ...
 * menuItems: NbMenuItem[] = [{ title: home, link: '/' }, { title: dashboard, link: 'dashboard' }];
 * // ...
 * <nb-menu [items]="menuItems"></nb-menu>
 * ```
 *
 * @styles
 *
 * menu-font-family:
 * menu-font-size:
 * menu-font-weight:
 * menu-fg:
 * menu-bg:
 * menu-active-fg:
 * menu-active-bg:
 * menu-active-font-weight:
 * menu-submenu-bg:
 * menu-submenu-fg:
 * menu-submenu-active-fg:
 * menu-submenu-active-bg:
 * menu-submenu-active-border-color:
 * menu-submenu-active-shadow:
 * menu-submenu-hover-fg:
 * menu-submenu-hover-bg:
 * menu-submenu-item-border-width:
 * menu-submenu-item-border-radius:
 * menu-submenu-item-padding:
 * menu-submenu-item-container-padding:
 * menu-submenu-padding:
 * menu-group-font-weight:
 * menu-group-font-size:
 * menu-group-fg:
 * menu-group-padding
 * menu-item-padding:
 * menu-item-separator:
 * menu-icon-font-size:
 * menu-icon-margin:
 * menu-icon-color:
 * menu-icon-active-color:
 */
var NbMenuComponent = /** @class */ (function () {
    function NbMenuComponent(window, menuInternalService, router) {
        this.window = window;
        this.menuInternalService = menuInternalService;
        this.router = router;
        this.alive = true;
        this.autoCollapseValue = false;
    }
    Object.defineProperty(NbMenuComponent.prototype, "inverse", {
        set: /**
           * Makes colors inverse based on current theme
           * @type boolean
           */
        function (val) {
            this.inverseValue = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbMenuComponent.prototype, "autoCollapse", {
        set: /**
           * Collapse all opened submenus on the toggle event
           * Default value is "false"
           * @type boolean
           */
        function (val) {
            this.autoCollapseValue = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    NbMenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.menuInternalService
            .onAddItem()
            .pipe(takeWhile(function () { return _this.alive; }), filter(function (data) { return _this.compareTag(data.tag); }))
            .subscribe(function (data) { return _this.onAddItem(data); });
        this.menuInternalService
            .onNavigateHome()
            .pipe(takeWhile(function () { return _this.alive; }), filter(function (data) { return _this.compareTag(data.tag); }))
            .subscribe(function () { return _this.navigateHome(); });
        this.menuInternalService
            .onGetSelectedItem()
            .pipe(takeWhile(function () { return _this.alive; }), filter(function (data) { return _this.compareTag(data.tag); }))
            .subscribe(function (data) {
            data.listener.next({ tag: _this.tag, item: _this.getSelectedItem(_this.items) });
        });
        this.router.events
            .pipe(takeWhile(function () { return _this.alive; }), filter(function (event) { return event instanceof NavigationEnd; }))
            .subscribe(function () {
            _this.menuInternalService.resetItems(_this.items);
            _this.menuInternalService.updateSelection(_this.items, _this.tag, _this.autoCollapseValue);
        });
        // TODO: this probably won't work if you pass items dynamically into items input
        this.menuInternalService.prepareItems(this.items);
        (_a = this.items).push.apply(_a, this.menuInternalService.getItems());
        var _a;
    };
    NbMenuComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () { return _this.menuInternalService.updateSelection(_this.items, _this.tag); });
    };
    NbMenuComponent.prototype.onAddItem = function (data) {
        (_a = this.items).push.apply(_a, data.items);
        this.menuInternalService.prepareItems(this.items);
        this.menuInternalService.updateSelection(this.items, this.tag, this.autoCollapseValue);
        var _a;
    };
    NbMenuComponent.prototype.onHoverItem = function (item) {
        this.menuInternalService.itemHover(item, this.tag);
    };
    NbMenuComponent.prototype.onToggleSubMenu = function (item) {
        if (this.autoCollapseValue) {
            this.menuInternalService.collapseAll(this.items, this.tag, item);
        }
        item.expanded = !item.expanded;
        this.menuInternalService.submenuToggle(item, this.tag);
    };
    // TODO: is not fired on page reload
    // TODO: is not fired on page reload
    NbMenuComponent.prototype.onSelectItem = 
    // TODO: is not fired on page reload
    function (item) {
        this.menuInternalService.resetItems(this.items);
        this.menuInternalService.selectItem(item, this.tag);
    };
    NbMenuComponent.prototype.onItemClick = function (item) {
        this.menuInternalService.itemClick(item, this.tag);
    };
    NbMenuComponent.prototype.ngOnDestroy = function () {
        this.alive = false;
    };
    NbMenuComponent.prototype.navigateHome = function () {
        var homeItem = this.getHomeItem(this.items);
        if (homeItem) {
            if (homeItem.link) {
                this.router.navigate([homeItem.link], { queryParams: homeItem.queryParams, fragment: homeItem.fragment });
            }
            if (homeItem.url) {
                this.window.location.href = homeItem.url;
            }
        }
    };
    NbMenuComponent.prototype.getHomeItem = function (items) {
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            if (item.home) {
                return item;
            }
            var homeItem = item.children && this.getHomeItem(item.children);
            if (homeItem) {
                return homeItem;
            }
        }
    };
    NbMenuComponent.prototype.compareTag = function (tag) {
        return !tag || tag === this.tag;
    };
    NbMenuComponent.prototype.getSelectedItem = function (items) {
        var _this = this;
        var selected = null;
        items.forEach(function (item) {
            if (item.selected) {
                selected = item;
            }
            if (item.selected && item.children && item.children.length > 0) {
                selected = _this.getSelectedItem(item.children);
            }
        });
        return selected;
    };
    NbMenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-menu',
                    styles: [":host /deep/ {display:block}:host /deep/ .menu-items,:host /deep/ .menu-item>.menu-items{list-style-type:none;overflow:hidden;transition:max-height 0.3s ease-in}:host /deep/ .menu-item a{display:flex;color:inherit;text-decoration:none;align-items:center}:host /deep/ .menu-item{cursor:pointer;}:host /deep/ .menu-item a .menu-title{flex:1}[dir=rtl] :host /deep/ .menu-item a .menu-title{text-align:right} "],
                    template: "\n    <ul class=\"menu-items\">\n      <ng-container *ngFor=\"let item of items\">\n        <li nbMenuItem *ngIf=\"!item.hidden\"\n            [menuItem]=\"item\"\n            [class.menu-group]=\"item.group\"\n            (hoverItem)=\"onHoverItem($event)\"\n            (toggleSubMenu)=\"onToggleSubMenu($event)\"\n            (selectItem)=\"onSelectItem($event)\"\n            (itemClick)=\"onItemClick($event)\"\n            class=\"menu-item\">\n        </li>\n      </ng-container>\n    </ul>\n  ",
                },] },
    ];
    /** @nocollapse */
    NbMenuComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [NB_WINDOW,] },] },
        { type: NbMenuInternalService, },
        { type: Router, },
    ]; };
    NbMenuComponent.propDecorators = {
        "inverseValue": [{ type: HostBinding, args: ['class.inverse',] },],
        "tag": [{ type: Input },],
        "items": [{ type: Input },],
        "inverse": [{ type: Input },],
        "autoCollapse": [{ type: Input },],
    };
    return NbMenuComponent;
}());
export { NbMenuComponent };
//# sourceMappingURL=menu.component.js.map