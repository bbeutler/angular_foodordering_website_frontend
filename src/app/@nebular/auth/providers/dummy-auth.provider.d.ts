import { Observable } from 'rxjs';
import { NbAbstractAuthProvider } from './abstract-auth.provider';
import { NbAuthResult } from '../services/auth-result';
export interface NbDummyAuthProviderConfig {
    delay?: number;
    alwaysFail?: boolean;
}
export declare class NbDummyAuthProvider extends NbAbstractAuthProvider {
    protected defaultConfig: NbDummyAuthProviderConfig;
    authenticate(data?: any): Observable<NbAuthResult>;
    register(data?: any): Observable<NbAuthResult>;
    requestPassword(data?: any): Observable<NbAuthResult>;
    resetPassword(data?: any): Observable<NbAuthResult>;
    logout(data?: any): Observable<NbAuthResult>;
    refreshToken(data?: any): Observable<NbAuthResult>;
    protected createDummyResult(data?: any): NbAuthResult;
}
