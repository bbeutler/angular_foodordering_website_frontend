/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, ComponentFactoryResolver, ElementRef, HostBinding, HostListener, Input, Renderer2, ViewChild, ViewContainerRef, Inject, PLATFORM_ID, } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, takeWhile } from 'rxjs/operators';
import { convertToBoolProperty } from '../helpers';
import { NbThemeService } from '../../services/theme.service';
import { NbSpinnerService } from '../../services/spinner.service';
import { NbLayoutDirectionService } from '../../services/direction.service';
import { NB_WINDOW, NB_DOCUMENT } from '../../theme.options';
/**
 * A container component which determines a content position inside of the layout.
 * The layout could contain unlimited columns (not including the sidebars).
 *
 * @example By default the columns are ordered from the left to the right,
 * but it's also possible to overwrite this behavior by setting a `left` attribute to the column,
 * moving it to the very first position:
 * ```
 * <nb-layout>
 *   <nb-layout-column>Second</nb-layout-column>
 *   <nb-layout-column>Third</nb-layout-column>
 *   <nb-layout-column left>First</nb-layout-column>
 * </nb-layout>
 * ```
 */
var NbLayoutColumnComponent = /** @class */ (function () {
    function NbLayoutColumnComponent() {
    }
    Object.defineProperty(NbLayoutColumnComponent.prototype, "left", {
        set: /**
           * Move the column to the very left position in the layout.
           * @param {boolean} val
           */
        function (val) {
            this.leftValue = convertToBoolProperty(val);
            this.startValue = false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbLayoutColumnComponent.prototype, "start", {
        set: /**
           * Make columnt first in the layout.
           * @param {boolean} val
           */
        function (val) {
            this.startValue = convertToBoolProperty(val);
            this.leftValue = false;
        },
        enumerable: true,
        configurable: true
    });
    NbLayoutColumnComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-layout-column',
                    template: "\n    <ng-content></ng-content>\n  ",
                },] },
    ];
    /** @nocollapse */
    NbLayoutColumnComponent.propDecorators = {
        "leftValue": [{ type: HostBinding, args: ['class.left',] },],
        "startValue": [{ type: HostBinding, args: ['class.start',] },],
        "left": [{ type: Input },],
        "start": [{ type: Input },],
    };
    return NbLayoutColumnComponent;
}());
export { NbLayoutColumnComponent };
/**
 * Page header component.
 * Located on top of the page above the layout columns and sidebars.
 * Could be made `fixed` by setting the corresponding property. In the fixed mode the header becomes
 * sticky to the top of the nb-layout (to of the page).
 *
 * @styles
 *
 * header-font-family
 * header-line-height
 * header-fg
 * header-bg
 * header-height
 * header-padding
 * header-shadow
 */
var NbLayoutHeaderComponent = /** @class */ (function () {
    function NbLayoutHeaderComponent() {
    }
    Object.defineProperty(NbLayoutHeaderComponent.prototype, "fixed", {
        set: /**
           * Makes the header sticky to the top of the nb-layout.
           * @param {boolean} val
           */
        function (val) {
            this.fixedValue = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    NbLayoutHeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-layout-header',
                    template: "\n    <nav [class.fixed]=\"fixedValue\">\n      <ng-content></ng-content>\n    </nav>\n  ",
                },] },
    ];
    /** @nocollapse */
    NbLayoutHeaderComponent.propDecorators = {
        "fixedValue": [{ type: HostBinding, args: ['class.fixed',] },],
        "fixed": [{ type: Input },],
    };
    return NbLayoutHeaderComponent;
}());
export { NbLayoutHeaderComponent };
/**
 * Page footer.
 * Located under the nb-layout content (specifically, under the columns).
 * Could be made `fixed`, becoming sticky to the bottom of the view port (window).
 *
 * @styles
 *
 * footer-height
 * footer-padding
 * footer-fg
 * footer-bg
 * footer-separator
 * footer-shadow
 */
var NbLayoutFooterComponent = /** @class */ (function () {
    function NbLayoutFooterComponent() {
    }
    Object.defineProperty(NbLayoutFooterComponent.prototype, "fixed", {
        set: /**
           * Makes the footer sticky to the bottom of the window.
           * @param {boolean} val
           */
        function (val) {
            this.fixedValue = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    NbLayoutFooterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-layout-footer',
                    template: "\n    <nav [class.fixed]=\"fixedValue\">\n      <ng-content></ng-content>\n    </nav>\n  ",
                },] },
    ];
    /** @nocollapse */
    NbLayoutFooterComponent.propDecorators = {
        "fixedValue": [{ type: HostBinding, args: ['class.fixed',] },],
        "fixed": [{ type: Input },],
    };
    return NbLayoutFooterComponent;
}());
export { NbLayoutFooterComponent };
/**
 * The general Nebular component-container.
 * It is required that all children component of the framework are located inside of the nb-layout.
 *
 * Can contain the following components inside:
 *
 * ```
 * nb-layout-header
 * nb-layout-column
 * nb-sidebar
 * nb-layout-footer
 * ```
 *
 * By default the layout fills up the full view-port.
 * The window scrollbars are disabled on the body and moved inside of the nb-layout, so that the scrollbars
 * won't mess with the fixed nb-header.
 *
 * The children components are projected into the flexible layout structure allowing to adjust the layout behavior
 * based on the settings provided.
 *
 * The layout content (columns) becomes centered when the window width is more than
 * the value specified in the theme variable `layout-content-width`.
 *
 * The layout also contains the area on the very top (the first child of the nb-layout), which could be used
 * to dynamically append some components like modals or spinners/loaders
 * so that they are located on top of the elements hierarchy.
 * More details are below under the `ThemeService` section.
 *
 * The layout component is also responsible for changing of the application themes.
 * It listens to the `themeChange` event and change the theme CSS class appended to body.
 * Based on the class appended a specific CSS-theme is applied to the application.
 * More details of the Theme System could be found here [Enabling Theme System](#/docs/concepts/theme-system)
 *
 * @example A simple layout example:
 *
 * ```
 * <nb-layout>
 *   <nb-layout-header>Great Company</nb-layout-header>
 *
 *   <nb-layout-column>
 *     Hello World!
 *   </nb-layout-column>
 *
 *   <nb-layout-footer>Contact us</nb-layout-footer>
 * </nb-layout>
 * ```
 *
 * @example For example, it is possible to ask the layout to center the columns (notice: we added a `center` attribute
 * to the layout:
 *
 * ```
 * <nb-layout center>
 *   <nb-layout-header>Great Company</nb-layout-header>
 *
 *   <nb-layout-column>
 *     Hello World!
 *   </nb-layout-column>
 *
 *   <nb-layout-footer>Contact us</nb-layout-footer>
 * </nb-layout>
 * ```
 *
 * @styles
 *
 * layout-font-family
 * layout-font-size
 * layout-line-height
 * layout-fg
 * layout-bg
 * layout-min-height
 * layout-content-width
 * layout-window-mode-min-width
 * layout-window-mode-max-width: window mode only, after this value layout turns into floating window
 * layout-window-mode-bg: window mode only, background
 * layout-window-mode-padding-top: window mode only, max padding from top
 * layout-window-shadow: window mode shadow
 * layout-padding
 * layout-medium-padding
 * layout-small-padding
 */
var NbLayoutComponent = /** @class */ (function () {
    function NbLayoutComponent(themeService, spinnerService, componentFactoryResolver, elementRef, renderer, router, window, document, platformId, layoutDirectionService) {
        var _this = this;
        this.themeService = themeService;
        this.spinnerService = spinnerService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.router = router;
        this.window = window;
        this.document = document;
        this.platformId = platformId;
        this.layoutDirectionService = layoutDirectionService;
        this.centerValue = false;
        this.windowModeValue = false;
        this.withScrollValue = false;
        this.afterViewInit$ = new BehaviorSubject(null);
        this.alive = true;
        this.themeService.onThemeChange()
            .pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function (theme) {
            var body = _this.document.getElementsByTagName('body')[0];
            if (theme.previous) {
                _this.renderer.removeClass(body, "nb-theme-" + theme.previous);
            }
            _this.renderer.addClass(body, "nb-theme-" + theme.name);
        });
        this.themeService.onAppendLayoutClass()
            .pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function (className) {
            _this.renderer.addClass(_this.elementRef.nativeElement, className);
        });
        this.themeService.onRemoveLayoutClass()
            .pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function (className) {
            _this.renderer.removeClass(_this.elementRef.nativeElement, className);
        });
        this.spinnerService.registerLoader(new Promise(function (resolve, reject) {
            _this.afterViewInit$
                .pipe(takeWhile(function () { return _this.alive; }))
                .subscribe(function (_) { return resolve(); });
        }));
        this.spinnerService.load();
        if (isPlatformBrowser(this.platformId)) {
            // trigger first time so that after the change we have the initial value
            this.themeService.changeWindowWidth(this.window.innerWidth);
        }
    }
    Object.defineProperty(NbLayoutComponent.prototype, "center", {
        set: /**
           * Defines whether the layout columns will be centered after some width
           * @param {boolean} val
           */
        function (val) {
            this.centerValue = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbLayoutComponent.prototype, "windowMode", {
        set: /**
           * Defines whether the layout enters a 'window' mode, when the layout content (including sidebars and fixed header)
           * becomes centered by width with a margin from the top of the screen, like a floating window.
           * Automatically enables `withScroll` mode, as in the window mode scroll must be inside the layout and cannot be on
           * window. (TODO: check this)
           * @param {boolean} val
           */
        function (val) {
            this.windowModeValue = convertToBoolProperty(val);
            this.withScroll = this.windowModeValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbLayoutComponent.prototype, "withScroll", {
        set: /**
           * Defines whether to move the scrollbars to layout or leave it at the body level.
           * Automatically set to true when `windowMode` is enabled.
           * @param {boolean} val
           */
        function (val) {
            this.withScrollValue = convertToBoolProperty(val);
            // TODO: is this the best way of doing it? as we don't have access to body from theme styles
            // TODO: add e2e test
            var body = this.document.getElementsByTagName('body')[0];
            if (this.withScrollValue) {
                this.renderer.setStyle(body, 'overflow', 'hidden');
            }
            else {
                this.renderer.setStyle(body, 'overflow', 'initial');
            }
        },
        enumerable: true,
        configurable: true
    });
    NbLayoutComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.themeService.onAppendToTop()
            .pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function (data) {
            var componentRef = _this.veryTopRef.createComponent(data.factory);
            data.listener.next(componentRef);
            data.listener.complete();
        });
        this.themeService.onClearLayoutTop()
            .pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function (data) {
            _this.veryTopRef.clear();
            data.listener.next(true);
        });
        this.layoutDirectionService.onDirectionChange()
            .pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function (direction) {
            _this.renderer.setProperty(_this.document, 'dir', direction);
        });
        this.afterViewInit$.next(true);
    };
    NbLayoutComponent.prototype.ngOnInit = function () {
        this.initScrollTop();
    };
    NbLayoutComponent.prototype.ngOnDestroy = function () {
        this.themeService.clearLayoutTop();
        this.alive = false;
    };
    NbLayoutComponent.prototype.onResize = function (event) {
        this.themeService.changeWindowWidth(event.target.innerWidth);
    };
    NbLayoutComponent.prototype.initScrollTop = function () {
        var _this = this;
        this.router.events
            .pipe(takeWhile(function () { return _this.alive; }), filter(function (event) { return event instanceof NavigationEnd; }))
            .subscribe(function () {
            _this.scrollableContainerRef.nativeElement.scrollTo && _this.scrollableContainerRef.nativeElement.scrollTo(0, 0);
        });
    };
    NbLayoutComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-layout',
                    styles: [":host{-webkit-font-smoothing:antialiased}[dir=ltr] :host{text-align:left}[dir=rtl] :host{text-align:right}:host .layout{display:flex;flex-direction:column}:host /deep/ nb-layout-header{display:block}:host /deep/ nb-layout-header nav{align-items:center;justify-content:flex-start;display:flex}:host /deep/ nb-layout-header.fixed{position:fixed;left:0;right:0;z-index:1040}:host .layout-container{display:flex;flex:1;-ms-flex:1 1 auto;flex-direction:row}[dir=ltr] :host .layout-container /deep/ nb-sidebar.left{order:0}[dir=rtl] :host .layout-container /deep/ nb-sidebar.left{order:2}[dir=ltr] :host .layout-container /deep/ nb-sidebar.right{order:2}[dir=rtl] :host .layout-container /deep/ nb-sidebar.right{order:0}:host .layout-container /deep/ nb-sidebar.end{order:2}:host .layout-container /deep/ nb-sidebar .fixed{position:fixed;width:100%;overflow-y:auto;height:100%}:host .layout-container .content{display:flex;flex:1;-ms-flex:1 1 auto;flex-direction:column;min-width:0}:host .layout-container .content.center{max-width:100%;position:relative;margin-left:auto;margin-right:auto}:host .layout-container .content .columns{display:flex;flex:1;-ms-flex:1 1 auto;flex-direction:row;width:100%}:host .layout-container .content .columns /deep/ nb-layout-column{order:1;flex:1 0;min-width:0}[dir=ltr] :host .layout-container .content .columns /deep/ nb-layout-column.left{order:0}[dir=rtl] :host .layout-container .content .columns /deep/ nb-layout-column.left{order:2}:host .layout-container .content .columns /deep/ nb-layout-column.start{order:0}:host .layout-container .content /deep/ nb-layout-footer{display:block;margin-top:auto}:host .layout-container .content /deep/ nb-layout-footer nav{justify-content:center;display:flex} "],
                    template: "\n    <ng-template #layoutTopDynamicArea></ng-template>\n    <div class=\"scrollable-container\" #scrollableContainer>\n      <div class=\"layout\">\n        <ng-content select=\"nb-layout-header\"></ng-content>\n        <div class=\"layout-container\">\n          <ng-content select=\"nb-sidebar\"></ng-content>\n          <div class=\"content\" [class.center]=\"centerValue\">\n            <div class=\"columns\">\n              <ng-content select=\"nb-layout-column\"></ng-content>\n            </div>\n            <ng-content select=\"nb-layout-footer\"></ng-content>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
                },] },
    ];
    /** @nocollapse */
    NbLayoutComponent.ctorParameters = function () { return [
        { type: NbThemeService, },
        { type: NbSpinnerService, },
        { type: ComponentFactoryResolver, },
        { type: ElementRef, },
        { type: Renderer2, },
        { type: Router, },
        { type: undefined, decorators: [{ type: Inject, args: [NB_WINDOW,] },] },
        { type: undefined, decorators: [{ type: Inject, args: [NB_DOCUMENT,] },] },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: NbLayoutDirectionService, },
    ]; };
    NbLayoutComponent.propDecorators = {
        "windowModeValue": [{ type: HostBinding, args: ['class.window-mode',] },],
        "withScrollValue": [{ type: HostBinding, args: ['class.with-scroll',] },],
        "center": [{ type: Input },],
        "windowMode": [{ type: Input },],
        "withScroll": [{ type: Input },],
        "veryTopRef": [{ type: ViewChild, args: ['layoutTopDynamicArea', { read: ViewContainerRef },] },],
        "scrollableContainerRef": [{ type: ViewChild, args: ['scrollableContainer', { read: ElementRef },] },],
        "onResize": [{ type: HostListener, args: ['window:resize', ['$event'],] },],
    };
    return NbLayoutComponent;
}());
export { NbLayoutComponent };
//# sourceMappingURL=layout.component.js.map