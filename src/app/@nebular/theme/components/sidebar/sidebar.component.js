/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, HostBinding, Input, ElementRef } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { convertToBoolProperty } from '../helpers';
import { NbThemeService } from '../../services/theme.service';
import { NbSidebarService } from './sidebar.service';
/**
 * Sidebar header container.
 *
 * Placeholder which contains a sidebar header content,
 * placed at the very top of the sidebar outside of the scroll area.
 */
var NbSidebarHeaderComponent = /** @class */ (function () {
    function NbSidebarHeaderComponent() {
    }
    NbSidebarHeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-sidebar-header',
                    template: "\n    <ng-content></ng-content>\n  ",
                },] },
    ];
    return NbSidebarHeaderComponent;
}());
export { NbSidebarHeaderComponent };
/**
 * Sidebar footer container.
 *
 * Placeholder which contains a sidebar footer content,
 * placed at the very bottom of the sidebar outside of the scroll area.
 */
var NbSidebarFooterComponent = /** @class */ (function () {
    function NbSidebarFooterComponent() {
    }
    NbSidebarFooterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-sidebar-footer',
                    template: "\n    <ng-content></ng-content>\n  ",
                },] },
    ];
    return NbSidebarFooterComponent;
}());
export { NbSidebarFooterComponent };
/**
 * Layout sidebar component.
 *
 * Sidebar can be placed on the left or the right side of the layout,
 * or on start or end position of layout (depends on document direction, left to right or right to left)
 * It can be fixed (shown above the content) or can push the layout when opened.
 *
 * There are three states - `expanded`, `collapsed`, `compacted`.
 * By default sidebar content is fixed and saves its position while the page is being scrolled.
 *
 * Sidebar also supports a `responsive` behavior, listening to window size change and changing its size respectably.
 *
 * @example Minimal sidebar example
 *
 * ```
 * <nb-sidebar>
 *   Sidebar content.
 * </nb-sidebar>
 * ```
 *
 * @example Example of fixed sidebar located on the left side, initially collapsed.
 *
 * ```
 * <nb-sidebar left fixed state="collapsed">
 *  <nb-sidebar-header>Header</nb-sidebar-header>
 *
 *    Sidebar content, menu or another component here.
 *
 *  <nb-sidebar-footer>
 *    Footer components here
 *  </nb-sidebar-footer>
 * </nb-sidebar>
 * ```
 *
 * @styles
 *
 * sidebar-font-size: Sidebar content font size
 * sidebar-line-height: Sidebar content line height
 * sidebar-fg: Foreground color
 * sidebar-bg: Background color
 * sidebar-height: Content height
 * sidebar-width: Expanded width
 * sidebar-width-compact: Compacted width
 * sidebar-padding: Sidebar content padding
 * sidebar-header-height: Sidebar header height
 * sidebar-footer-height: Sidebar footer height
 * sidebar-shadow: Sidebar container shadow
 *
 */
var NbSidebarComponent = /** @class */ (function () {
    function NbSidebarComponent(sidebarService, themeService, element) {
        this.sidebarService = sidebarService;
        this.themeService = themeService;
        this.element = element;
        this.responsiveValue = false;
        this.alive = true;
        this.fixedValue = false;
        this.rightValue = false;
        this.leftValue = true;
        this.startValue = false;
        this.endValue = false;
        this.responsiveState = NbSidebarComponent.RESPONSIVE_STATE_PC;
    }
    Object.defineProperty(NbSidebarComponent.prototype, "expanded", {
        get: 
        // TODO: rename stateValue to state (take a look to the card component)
        function () {
            return this.stateValue === NbSidebarComponent.STATE_EXPANDED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSidebarComponent.prototype, "collapsed", {
        get: function () {
            return this.stateValue === NbSidebarComponent.STATE_COLLAPSED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSidebarComponent.prototype, "compacted", {
        get: function () {
            return this.stateValue === NbSidebarComponent.STATE_COMPACTED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSidebarComponent.prototype, "right", {
        set: /**
           * Places sidebar on the right side
           * @type {boolean}
           */
        function (val) {
            this.rightValue = convertToBoolProperty(val);
            this.leftValue = !this.rightValue;
            this.startValue = false;
            this.endValue = false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSidebarComponent.prototype, "left", {
        set: /**
           * Places sidebar on the left side
           * @type {boolean}
           */
        function (val) {
            this.leftValue = convertToBoolProperty(val);
            this.rightValue = !this.leftValue;
            this.startValue = false;
            this.endValue = false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSidebarComponent.prototype, "start", {
        set: /**
           * Places sidebar on the start edge of layout
           * @type {boolean}
           */
        function (val) {
            this.startValue = convertToBoolProperty(val);
            this.endValue = !this.startValue;
            this.leftValue = false;
            this.rightValue = false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSidebarComponent.prototype, "end", {
        set: /**
           * Places sidebar on the end edge of layout
           * @type {boolean}
           */
        function (val) {
            this.endValue = convertToBoolProperty(val);
            this.startValue = !this.endValue;
            this.leftValue = false;
            this.rightValue = false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSidebarComponent.prototype, "fixed", {
        set: /**
           * Makes sidebar fixed (shown above the layout content)
           * @type {boolean}
           */
        function (val) {
            this.fixedValue = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSidebarComponent.prototype, "state", {
        set: /**
           * Initial sidebar state, `expanded`|`collapsed`|`compacted`
           * @type {string}
           */
        function (val) {
            this.stateValue = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSidebarComponent.prototype, "responsive", {
        set: /**
           * Makes sidebar listen to media query events and change its behaviour
           * @type {boolean}
           */
        function (val) {
            this.responsiveValue = convertToBoolProperty(val);
            this.toggleResponsive(this.responsiveValue);
        },
        enumerable: true,
        configurable: true
    });
    NbSidebarComponent.prototype.toggleResponsive = function (enabled) {
        if (enabled) {
            this.mediaQuerySubscription = this.onMediaQueryChanges();
        }
        else if (this.mediaQuerySubscription) {
            this.mediaQuerySubscription.unsubscribe();
        }
    };
    NbSidebarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sidebarService.onToggle()
            .pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function (data) {
            if (!_this.tag || _this.tag === data.tag) {
                _this.toggle(data.compact);
            }
        });
        this.sidebarService.onExpand()
            .pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function (data) {
            if (!_this.tag || _this.tag === data.tag) {
                _this.expand();
            }
        });
        this.sidebarService.onCollapse()
            .pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function (data) {
            if (!_this.tag || _this.tag === data.tag) {
                _this.collapse();
            }
        });
    };
    NbSidebarComponent.prototype.ngOnDestroy = function () {
        this.alive = false;
        if (this.mediaQuerySubscription) {
            this.mediaQuerySubscription.unsubscribe();
        }
    };
    // TODO: this is more of a workaround, should be a better way to make components communicate to each other
    // TODO: this is more of a workaround, should be a better way to make components communicate to each other
    NbSidebarComponent.prototype.onClick = 
    // TODO: this is more of a workaround, should be a better way to make components communicate to each other
    function (event) {
        var menu = this.element.nativeElement.querySelector('nb-menu');
        if (menu && menu.contains(event.target)) {
            var link = event.target;
            var linkChildren = ['span', 'i'];
            // if we clicked on span - get the link
            if (linkChildren.indexOf(link.tagName.toLowerCase()) !== -1 && link.parentNode) {
                link = event.target.parentNode;
            }
            // we only expand if an item has children
            if (link && link.nextElementSibling && link.nextElementSibling.classList.contains('menu-items')) {
                this.expand();
            }
        }
    };
    /**
     * Collapses the sidebar
     */
    /**
       * Collapses the sidebar
       */
    NbSidebarComponent.prototype.collapse = /**
       * Collapses the sidebar
       */
    function () {
        this.state = NbSidebarComponent.STATE_COLLAPSED;
    };
    /**
     * Expands the sidebar
     */
    /**
       * Expands the sidebar
       */
    NbSidebarComponent.prototype.expand = /**
       * Expands the sidebar
       */
    function () {
        this.state = NbSidebarComponent.STATE_EXPANDED;
    };
    /**
     * Compacts the sidebar (minimizes)
     */
    /**
       * Compacts the sidebar (minimizes)
       */
    NbSidebarComponent.prototype.compact = /**
       * Compacts the sidebar (minimizes)
       */
    function () {
        this.state = NbSidebarComponent.STATE_COMPACTED;
    };
    /**
     * Toggles sidebar state (expanded|collapsed|compacted)
     * @param {boolean} compact If true, then sidebar state will be changed between expanded & compacted,
     * otherwise - between expanded & collapsed. False by default.
     *
     * @example Toggle sidebar state
     *
     * ```
     * this.sidebar.toggle(true);
     * ```
     */
    /**
       * Toggles sidebar state (expanded|collapsed|compacted)
       * @param {boolean} compact If true, then sidebar state will be changed between expanded & compacted,
       * otherwise - between expanded & collapsed. False by default.
       *
       * @example Toggle sidebar state
       *
       * ```
       * this.sidebar.toggle(true);
       * ```
       */
    NbSidebarComponent.prototype.toggle = /**
       * Toggles sidebar state (expanded|collapsed|compacted)
       * @param {boolean} compact If true, then sidebar state will be changed between expanded & compacted,
       * otherwise - between expanded & collapsed. False by default.
       *
       * @example Toggle sidebar state
       *
       * ```
       * this.sidebar.toggle(true);
       * ```
       */
    function (compact) {
        if (compact === void 0) { compact = false; }
        if (this.responsiveEnabled()) {
            if (this.responsiveState === NbSidebarComponent.RESPONSIVE_STATE_MOBILE) {
                compact = false;
            }
        }
        var closedStates = [NbSidebarComponent.STATE_COMPACTED, NbSidebarComponent.STATE_COLLAPSED];
        if (compact) {
            this.state = closedStates.indexOf(this.stateValue) >= 0 ?
                NbSidebarComponent.STATE_EXPANDED : NbSidebarComponent.STATE_COMPACTED;
        }
        else {
            this.state = closedStates.indexOf(this.stateValue) >= 0 ?
                NbSidebarComponent.STATE_EXPANDED : NbSidebarComponent.STATE_COLLAPSED;
        }
    };
    NbSidebarComponent.prototype.onMediaQueryChanges = function () {
        var _this = this;
        return this.themeService.onMediaQueryChange()
            .subscribe(function (_a) {
            var prev = _a[0], current = _a[1];
            // TODO: get width by the key and define only max width for the tablets and mobiles
            var tablet = ['xs', 'is', 'sm', 'md', 'lg'];
            var mobile = ['xs', 'is'];
            if (tablet.indexOf(current.name) !== -1) {
                _this.fixed = true;
                _this.compact();
                _this.responsiveState = NbSidebarComponent.RESPONSIVE_STATE_TABLET;
            }
            if (mobile.indexOf(current.name) !== -1) {
                _this.collapse();
                _this.responsiveState = NbSidebarComponent.RESPONSIVE_STATE_MOBILE;
            }
            if (tablet.indexOf(current.name) === -1 && prev.width < current.width) {
                _this.expand();
                _this.fixed = false;
                _this.responsiveState = NbSidebarComponent.RESPONSIVE_STATE_PC;
            }
        });
    };
    NbSidebarComponent.prototype.responsiveEnabled = function () {
        return this.responsiveValue;
    };
    NbSidebarComponent.STATE_EXPANDED = 'expanded';
    NbSidebarComponent.STATE_COLLAPSED = 'collapsed';
    NbSidebarComponent.STATE_COMPACTED = 'compacted';
    NbSidebarComponent.RESPONSIVE_STATE_MOBILE = 'mobile';
    NbSidebarComponent.RESPONSIVE_STATE_TABLET = 'tablet';
    NbSidebarComponent.RESPONSIVE_STATE_PC = 'pc';
    NbSidebarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-sidebar',
                    styles: [":host{display:flex;flex-direction:column;overflow:hidden;z-index:auto;order:0}:host .scrollable{overflow-y:auto;overflow-x:hidden;flex:1}:host .main-container{position:fixed;transform:translate3d(0, 0, 0);display:flex;flex-direction:column}:host.right{margin-right:0;margin-left:auto}[dir=ltr] :host.right{order:4}[dir=rtl] :host.right{order:0}:host.end{order:4}[dir=ltr] :host.end{margin-right:0;margin-left:auto}[dir=rtl] :host.end{margin-left:0;margin-right:auto}:host.fixed{position:fixed;height:100%;z-index:999;top:0;bottom:0;left:0}:host.fixed.right{right:0}[dir=ltr] :host.fixed.start{left:0}[dir=rtl] :host.fixed.start{right:0}[dir=ltr] :host.fixed.end{right:0}[dir=rtl] :host.fixed.end{left:0}:host /deep/ nb-sidebar-footer{margin-top:auto;display:block}:host /deep/ nb-sidebar-header{display:block} "],
                    template: "\n    <div class=\"main-container\">\n      <ng-content select=\"nb-sidebar-header\"></ng-content>\n      <div class=\"scrollable\" (click)=\"onClick($event)\">\n        <ng-content></ng-content>\n      </div>\n      <ng-content select=\"nb-sidebar-footer\"></ng-content>\n    </div>\n  ",
                },] },
    ];
    /** @nocollapse */
    NbSidebarComponent.ctorParameters = function () { return [
        { type: NbSidebarService, },
        { type: NbThemeService, },
        { type: ElementRef, },
    ]; };
    NbSidebarComponent.propDecorators = {
        "fixedValue": [{ type: HostBinding, args: ['class.fixed',] },],
        "rightValue": [{ type: HostBinding, args: ['class.right',] },],
        "leftValue": [{ type: HostBinding, args: ['class.left',] },],
        "startValue": [{ type: HostBinding, args: ['class.start',] },],
        "endValue": [{ type: HostBinding, args: ['class.end',] },],
        "expanded": [{ type: HostBinding, args: ['class.expanded',] },],
        "collapsed": [{ type: HostBinding, args: ['class.collapsed',] },],
        "compacted": [{ type: HostBinding, args: ['class.compacted',] },],
        "right": [{ type: Input },],
        "left": [{ type: Input },],
        "start": [{ type: Input },],
        "end": [{ type: Input },],
        "fixed": [{ type: Input },],
        "state": [{ type: Input },],
        "responsive": [{ type: Input },],
        "tag": [{ type: Input },],
    };
    return NbSidebarComponent;
}());
export { NbSidebarComponent };
//# sourceMappingURL=sidebar.component.js.map