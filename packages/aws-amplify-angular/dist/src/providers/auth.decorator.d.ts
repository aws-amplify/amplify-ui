import { Subject } from 'rxjs';
import { AuthState } from './auth.state';
export declare function authDecorator(
  authState: Subject<AuthState>,
  authModule: any
): void;
