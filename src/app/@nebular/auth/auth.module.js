import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NbLayoutModule, NbCardModule, NbCheckboxModule } from '../theme';
import { NbAuthService } from './services/auth.service';
import { NbDummyAuthProvider } from './providers/dummy-auth.provider';
import { NbEmailPassAuthProvider } from './providers/email-pass-auth.provider';
import { NbTokenService } from './services/token/token.service';
import { NbAuthSimpleToken } from './services/token/token';
import { NbTokenLocalStorage, NbTokenStorage } from './services/token/token-storage';
import { defaultSettings, NB_AUTH_USER_OPTIONS, NB_AUTH_OPTIONS, NB_AUTH_PROVIDERS, NB_AUTH_INTERCEPTOR_HEADER, NB_AUTH_TOKEN_CLASS, } from './auth.options';
import { NbAuthComponent } from './components/auth.component';
import { NbAuthBlockComponent } from './components/auth-block/auth-block.component';
import { NbLoginComponent } from './components/login/login.component';
import { NbRegisterComponent } from './components/register/register.component';
import { NbLogoutComponent } from './components/logout/logout.component';
import { NbRequestPasswordComponent } from './components/request-password/request-password.component';
import { NbResetPasswordComponent } from './components/reset-password/reset-password.component';
import { routes } from './auth.routes';
import { deepExtend } from './helpers';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

export function nbAuthServiceFactory(config, tokenService, injector) {
    var providers = config.providers || {};
    for (var key in providers) {
        if (providers.hasOwnProperty(key)) {
            var provider = providers[key];
            var object = injector.get(provider.service);
            object.setConfig(provider.config || {});
        }
    }
    return new NbAuthService(tokenService, injector, providers);
}
export function nbOptionsFactory(options) {
    return deepExtend(defaultSettings, options);
}
var NbAuthModule = /** @class */ (function () {
    function NbAuthModule() {
    }
    NbAuthModule.forRoot = function (nbAuthOptions) {
        return {
            ngModule: NbAuthModule,
            providers: [
                { provide: NB_AUTH_USER_OPTIONS, useValue: nbAuthOptions },
                { provide: NB_AUTH_OPTIONS, useFactory: nbOptionsFactory, deps: [NB_AUTH_USER_OPTIONS] },
                { provide: NB_AUTH_PROVIDERS, useValue: {} },
                { provide: NB_AUTH_TOKEN_CLASS, useValue: NbAuthSimpleToken },
                { provide: NB_AUTH_INTERCEPTOR_HEADER, useValue: 'Authorization' },
                {
                    provide: NbAuthService,
                    useFactory: nbAuthServiceFactory,
                    deps: [NB_AUTH_OPTIONS, NbTokenService, Injector],
                },
                { provide: NbTokenStorage, useClass: NbTokenLocalStorage },
                NbTokenService,
                NbDummyAuthProvider,
                NbEmailPassAuthProvider,
                ApiService,
                CookieService,
            ],
        };
    };
    NbAuthModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        NbLayoutModule,
                        NbCardModule,
                        NbCheckboxModule,
                        RouterModule.forChild(routes),
                        FormsModule,
                        HttpClientModule,
                    ],
                    declarations: [
                        NbAuthComponent,
                        NbAuthBlockComponent,
                        NbLoginComponent,
                        NbRegisterComponent,
                        NbRequestPasswordComponent,
                        NbResetPasswordComponent,
                        NbLogoutComponent,
                    ],
                    exports: [
                        NbAuthComponent,
                        NbAuthBlockComponent,
                        NbLoginComponent,
                        NbRegisterComponent,
                        NbRequestPasswordComponent,
                        NbResetPasswordComponent,
                        NbLogoutComponent,
                    ],
                },] },
    ];
    return NbAuthModule;
}());
export { NbAuthModule };
//# sourceMappingURL=auth.module.js.map