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
export declare class NbFlipCardComponent {
    /**
     * Flip state
     * @type boolean
     */
    flipped: boolean;
    toggleFlip(): void;
}
