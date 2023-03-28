/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { NbThemeService } from '../../services/theme.service';
import { NbSidebarService } from './sidebar.service';
/**
 * Sidebar header container.
 *
 * Placeholder which contains a sidebar header content,
 * placed at the very top of the sidebar outside of the scroll area.
 */
export declare class NbSidebarHeaderComponent {
}
/**
 * Sidebar footer container.
 *
 * Placeholder which contains a sidebar footer content,
 * placed at the very bottom of the sidebar outside of the scroll area.
 */
export declare class NbSidebarFooterComponent {
}
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
export declare class NbSidebarComponent implements OnInit, OnDestroy {
    private sidebarService;
    private themeService;
    private element;
    static readonly STATE_EXPANDED: string;
    static readonly STATE_COLLAPSED: string;
    static readonly STATE_COMPACTED: string;
    static readonly RESPONSIVE_STATE_MOBILE: string;
    static readonly RESPONSIVE_STATE_TABLET: string;
    static readonly RESPONSIVE_STATE_PC: string;
    protected stateValue: string;
    protected responsiveValue: boolean;
    private alive;
    fixedValue: boolean;
    rightValue: boolean;
    leftValue: boolean;
    startValue: boolean;
    endValue: boolean;
    readonly expanded: boolean;
    readonly collapsed: boolean;
    readonly compacted: boolean;
    /**
     * Places sidebar on the right side
     * @type {boolean}
     */
    right: boolean;
    /**
     * Places sidebar on the left side
     * @type {boolean}
     */
    left: boolean;
    /**
     * Places sidebar on the start edge of layout
     * @type {boolean}
     */
    start: boolean;
    /**
     * Places sidebar on the end edge of layout
     * @type {boolean}
     */
    end: boolean;
    /**
     * Makes sidebar fixed (shown above the layout content)
     * @type {boolean}
     */
    fixed: boolean;
    /**
     * Initial sidebar state, `expanded`|`collapsed`|`compacted`
     * @type {string}
     */
    state: string;
    /**
     * Makes sidebar listen to media query events and change its behaviour
     * @type {boolean}
     */
    responsive: boolean;
    /**
     * Tags a sidebar with some ID, can be later used in the sidebar service
     * to determine which sidebar triggered the action, if multiple sidebars exist on the page.
     *
     * @type {string}
     */
    tag: string;
    private mediaQuerySubscription;
    private responsiveState;
    constructor(sidebarService: NbSidebarService, themeService: NbThemeService, element: ElementRef);
    toggleResponsive(enabled: boolean): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    onClick(event: any): void;
    /**
     * Collapses the sidebar
     */
    collapse(): void;
    /**
     * Expands the sidebar
     */
    expand(): void;
    /**
     * Compacts the sidebar (minimizes)
     */
    compact(): void;
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
    toggle(compact?: boolean): void;
    protected onMediaQueryChanges(): Subscription;
    protected responsiveEnabled(): boolean;
}
