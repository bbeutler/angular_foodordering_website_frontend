import { Component, Input, HostBinding } from '@angular/core';
/**
 * Flip card component.
 *
 * ![image](assets/images/components/flip-card.gif)
 *
 * @example
 *
 * ```
 * <nb-flip-card>
 *   <nb-card-front>
 *     <nb-card><nb-card-body>Front Card</nb-card-body></nb-card>
 *   </nb-card-front>
 *   <nb-card-back>
 *     <nb-card><nb-card-body>Back Card</nb-card-body></nb-card>
 *   </nb-card-back>
 * </nb-flip-card>
 * ```
 */
var NbFlipCardComponent = /** @class */ (function () {
    function NbFlipCardComponent() {
        /**
           * Flip state
           * @type boolean
           */
        this.flipped = false;
    }
    NbFlipCardComponent.prototype.toggleFlip = function () {
        this.flipped = !this.flipped;
    };
    NbFlipCardComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-flip-card',
                    styles: [":host{display:block;perspective:1200px;position:relative}:host.flipped .flipcard-body{transform:rotateY(180deg)}:host.flipped .flipcard-body .front-container .flip-button{opacity:0}:host .flipcard-body{display:flex;transition:transform 0.5s;transform-style:preserve-3d}:host .flipcard-body .front-container,:host .flipcard-body .back-container{backface-visibility:hidden;flex:1}:host .flipcard-body .front-container .flip-button,:host .flipcard-body .back-container .flip-button{cursor:pointer;position:absolute;right:0;bottom:0;opacity:1;transition:opacity 0s 0.15s}:host .flipcard-body .back-container{transform:rotateY(180deg)} "],
                    template: "\n    <div class=\"flipcard-body\">\n      <div class=\"front-container\">\n        <ng-content select=\"nb-card-front\"></ng-content>\n        <a class=\"flip-button\" (click)=\"toggleFlip()\">\n          <i class=\"nb-arrow-dropleft\" aria-hidden=\"true\"></i>\n        </a>\n      </div>\n      <div class=\"back-container\">\n        <ng-content select=\"nb-card-back\"></ng-content>\n        <a class=\"flip-button\" (click)=\"toggleFlip()\">\n          <i class=\"nb-arrow-dropleft\" aria-hidden=\"true\"></i>\n        </a>\n      </div>\n    </div>\n  ",
                },] },
    ];
    /** @nocollapse */
    NbFlipCardComponent.propDecorators = {
        "flipped": [{ type: Input }, { type: HostBinding, args: ['class.flipped',] },],
    };
    return NbFlipCardComponent;
}());
export { NbFlipCardComponent };
//# sourceMappingURL=flip-card.component.js.map