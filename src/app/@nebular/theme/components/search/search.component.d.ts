/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { AfterViewInit, ElementRef, EventEmitter, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NbSearchService } from './search.service';
import { NbThemeService } from '../../services/theme.service';
/**
 * search-field-component is used under the hood by nb-search component
 * can't be used itself
 */
export declare class NbSearchFieldComponent {
    static readonly TYPE_MODAL_ZOOMIN: string;
    static readonly TYPE_ROTATE_LAYOUT: string;
    static readonly TYPE_MODAL_MOVE: string;
    static readonly TYPE_CURTAIN: string;
    static readonly TYPE_COLUMN_CURTAIN: string;
    static readonly TYPE_MODAL_DROP: string;
    static readonly TYPE_MODAL_HALF: string;
    searchType: string;
    placeholder: string;
    hint: string;
    searchClose: EventEmitter<{}>;
    search: EventEmitter<{}>;
    tabOut: EventEmitter<{}>;
    inputElement: ElementRef;
    showSearch: boolean;
    readonly modalZoomin: boolean;
    readonly rotateLayout: boolean;
    readonly modalMove: boolean;
    readonly curtain: boolean;
    readonly columnCurtain: boolean;
    readonly modalDrop: boolean;
    readonly modalHalf: boolean;
    type: any;
    closeSearch(): void;
    submitSearch(term: any): void;
}
/**
 * Beautiful full-page search control.
 *
 * @styles
 *
 * search-btn-open-fg:
 * search-btn-close-fg:
 * search-bg:
 * search-bg-secondary:
 * search-text:
 * search-info:
 * search-dash:
 * search-placeholder:
 */
export declare class NbSearchComponent implements OnInit, AfterViewInit, OnDestroy {
    private searchService;
    private themeService;
    private router;
    private alive;
    /**
     * Tags a search with some ID, can be later used in the search service
     * to determine which search component triggered the action, if multiple searches exist on the page.
     *
     * @type {string}
     */
    tag: string;
    /**
     * Search input placeholder
     * @type {string}
     */
    placeholder: string;
    /**
     * Hint showing under the input field to improve user experience
     *
     * @type {string}
     */
    hint: string;
    showSearch: boolean;
    attachedSearchContainer: ViewContainerRef;
    private searchFieldComponentRef$;
    private searchType;
    constructor(searchService: NbSearchService, themeService: NbThemeService, router: Router);
    /**
     * Search design type, available types are
     * modal-zoomin, rotate-layout, modal-move, curtain, column-curtain, modal-drop, modal-half
     * @type {string}
     */
    type: any;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    openSearch(): void;
    connectToSearchField(componentRef: any): void;
    ngOnDestroy(): void;
}
