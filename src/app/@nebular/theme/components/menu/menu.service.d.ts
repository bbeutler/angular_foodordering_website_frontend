import { Location } from '@angular/common';
import { Params } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
export interface NbMenuBag {
    tag: string;
    item: NbMenuItem;
}
/**
 * Menu Item options
 */
export declare class NbMenuItem {
    /**
     * Item Title
     * @type {string}
     */
    title: string;
    /**
     * Item relative link (for routerLink)
     * @type {string}
     */
    link?: string;
    /**
     * Item URL (absolute)
     * @type {string}
     */
    url?: string;
    /**
     * Icon class name
     * @type {string}
     */
    icon?: string;
    /**
     * Expanded by defaul
     * @type {boolean}
     */
    expanded?: boolean;
    /**
     * Children items
     * @type {List<NbMenuItem>}
     */
    children?: NbMenuItem[];
    /**
     * Children items height
     * @type {number}
     */
    subMenuHeight?: number;
    /**
     * HTML Link target
     * @type {string}
     */
    target?: string;
    /**
     * Hidden Item
     * @type {boolean}
     */
    hidden?: boolean;
    /**
     * Item is selected when partly or fully equal to the current url
     * @type {string}
     */
    pathMatch?: string;
    /**
     * Where this is a home item
     * @type {boolean}
     */
    home?: boolean;
    /**
     * Whether the item is just a group (non-clickable)
     * @type {boolean}
     */
    group?: boolean;
    /** Map of query parameters
     *@type {Params}
     */
    queryParams?: Params;
    parent?: NbMenuItem;
    selected?: boolean;
    data?: any;
    fragment?: string;
}
/**
 * Menu Service. Allows you to listen to menu events, or to interact with a menu.
 */
export declare class NbMenuService {
    /**
     * Add items to the end of the menu items list
     * @param {List<NbMenuItem>} items
     * @param {string} tag
     */
    addItems(items: NbMenuItem[], tag?: string): void;
    /**
     * Navigate to the home menu item
     * @param {string} tag
     */
    navigateHome(tag?: string): void;
    /**
     * Returns currently selected item. Won't subscribe to the future events.
     * @param {string} tag
     * @returns {Observable<{tag: string; item: NbMenuItem}>}
     */
    getSelectedItem(tag?: string): Observable<NbMenuBag>;
    onItemClick(): Observable<NbMenuBag>;
    onItemSelect(): Observable<NbMenuBag>;
    onItemHover(): Observable<NbMenuBag>;
    onSubmenuToggle(): Observable<NbMenuBag>;
}
export declare class NbMenuInternalService {
    private location;
    private items;
    constructor(location: Location);
    getItems(): NbMenuItem[];
    prepareItems(items: NbMenuItem[]): void;
    updateSelection(items: NbMenuItem[], tag: string, collapseOther?: boolean): void;
    resetItems(items: NbMenuItem[]): void;
    collapseAll(items: NbMenuItem[], tag: string, except?: NbMenuItem): void;
    onAddItem(): Observable<{
        tag: string;
        items: NbMenuItem[];
    }>;
    onNavigateHome(): Observable<{
        tag: string;
    }>;
    onGetSelectedItem(): Observable<{
        tag: string;
        listener: BehaviorSubject<NbMenuBag>;
    }>;
    itemHover(item: NbMenuItem, tag?: string): void;
    submenuToggle(item: NbMenuItem, tag?: string): void;
    itemSelect(item: NbMenuItem, tag?: string): void;
    itemClick(item: NbMenuItem, tag?: string): void;
    private resetItem(item);
    private isParent(parent, child);
    private collapseItem(item, tag, except?);
    private applyDefaults(item, defaultItem);
    private setParent(item);
    selectItem(item: NbMenuItem, tag: string): void;
    private selectParent({parent: item}, tag);
    private selectItemByUrl(item, tag);
    private selectedInUrl(item);
}
