import { Injectable } from '@angular/core';
import { authMachine } from '@aws-amplify/ui-core';
import { Logger } from '@aws-amplify/core';
import { Interpreter, interpret, State } from 'xstate';

const logger = new Logger('StateHachine');
/**
 * AmplifyContextService contains access to the xstate machine
 * and custom components passed by the user.
 */
@Injectable({
  providedIn: 'root' // ensure we have a singleton service
})
export class StateMachineService {
  private _authState: State<any>;
  private _authService: Interpreter<any>;

  public set authState(authState: any) {
    this._authState = authState;
  }

  public get authState(): any {
    return this._authState;
  }

  public get authService(): Interpreter<any> {
    return this._authService;
  }

  constructor() {
    this._authService = interpret(authMachine, { devTools: true })
      .onTransition(state => {
        logger.log('transitioned to', state, this._authService);
        this._authState = state; // send the top level service name
      })
      .start();
  }
}
