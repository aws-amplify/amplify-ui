import { Injectable } from '@angular/core';
import {
  AuthInterpreter,
  authMachine,
  AuthMachineState
} from '@aws-amplify/ui-core';
import { Logger } from '@aws-amplify/core';
import { Interpreter, interpret } from 'xstate';

const logger = new Logger('StateHachine');
/**
 * AmplifyContextService contains access to the xstate machine
 * and custom components passed by the user.
 */
@Injectable({
  providedIn: 'root' // ensure we have a singleton service
})
export class StateMachineService {
  private _authState: AuthMachineState;
  private _authService: AuthInterpreter;

  public set authState(authState: any) {
    this._authState = authState;
  }

  public get authState(): any {
    return this._authState;
  }

  public get authService(): AuthInterpreter {
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
