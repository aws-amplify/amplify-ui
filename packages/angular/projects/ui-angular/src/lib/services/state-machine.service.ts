import { Injectable } from '@angular/core';
import {
  AuthContext,
  AuthEvent,
  AuthInterpreter,
  authMachine,
  AuthMachineState,
  getSendAliases,
} from '@aws-amplify/ui';
import { interpret, Event } from 'xstate';

/**
 * AmplifyContextService contains access to the xstate machine
 * and custom components passed by the user.
 */
@Injectable({
  providedIn: 'root', // ensure we have a singleton service
})
export class StateMachineService {
  private _authState: AuthMachineState;
  private _authService: AuthInterpreter;
  private _user: Record<string, any>; // TODO: strongly type CognitoUser
  private _services: ReturnType<typeof getSendAliases>;

  constructor() {
    const interpreter = interpret(authMachine, { devTools: true })
      .onTransition((state) => {
        this._user = state.context.user;
        this._authState = state;
      })
      .start();
    this._services = getSendAliases(interpreter.send);
    this._authService = interpreter;
  }

  public get services() {
    return this._services;
  }

  public get authState(): AuthMachineState {
    return this._authState;
  }

  public get authService(): AuthInterpreter {
    return this._authService;
  }

  public get user(): Record<string, any> {
    return this._user;
  }

  public get context(): AuthContext {
    return this._authState.context;
  }

  public send(event: Event<AuthEvent>) {
    this.authService.send(event);
  }
}
