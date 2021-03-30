import { Injectable } from '@angular/core';
import { authMachine } from '@aws-amplify/ui-core';
import { Logger } from '@aws-amplify/core';
import { Interpreter, interpret } from 'xstate';

const logger = new Logger('StateHachine');
/**
 * AmplifyContextService contains access to the xstate machine
 * and custom components passed by the user.
 */
@Injectable({
  providedIn: 'root', // ensure we have a singleton service
})
export class StateMachineService {
  private _authState: string | object;
  private _authService: Interpreter<any>;

  public set authState(authState: any) {
    this._authState = authState;
  }

  public get authState(): any {
    return this._authState;
  }

  public get authService(): Interpreter<any> {
    console.log(this._authService);
    return this._authService;
  }

  constructor() {
    const authService = interpret(authMachine).start();
    this._authService = authService;
    authService.onTransition((state) => {
      logger.debug('state transition to:', state);
      this._authState = state.value;
    });
  }
}
