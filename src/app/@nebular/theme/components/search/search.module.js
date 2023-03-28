import { NgModule } from '@angular/core';
import { NbSharedModule } from '../shared/shared.module';
import { NbSearchComponent, NbSearchFieldComponent } from './search.component';
import { NbSearchService } from './search.service';
var NbSearchModule = /** @class */ (function () {
    function NbSearchModule() {
    }
    NbSearchModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        NbSharedModule,
                    ],
                    declarations: [
                        NbSearchComponent,
                        NbSearchFieldComponent,
                    ],
                    exports: [
                        NbSearchComponent,
                        NbSearchFieldComponent,
                    ],
                    providers: [
                        NbSearchService,
                    ],
                    entryComponents: [
                        NbSearchFieldComponent,
                    ],
                },] },
    ];
    return NbSearchModule;
}());
export { NbSearchModule };
//# sourceMappingURL=search.module.js.map