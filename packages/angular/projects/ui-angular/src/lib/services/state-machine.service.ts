import { Injectable } from '@angular/core';
import {
  AuthContext,
  AuthEvent,
  AuthInterpreter,
  authMachine,
  AuthMachineState,
  getSendEventAliases,
  LoginMechanism,
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
  private _services: ReturnType<typeof getSendEventAliases>;

  constructor() {}

  public startMachine(loginMechanisms?: LoginMechanism[]) {
    const machine = authMachine.withContext({
      config: {
        login_mechanisms: loginMechanisms,
      },
    });

    const authService = interpret(machine, {
      devTools: process.env.NODE_ENV === 'development',
    })
      .onTransition((state) => {
        this._user = state.context.user;
        this._authState = state;
      })
      .start();

    console.log(loginMechanisms, machine, authService);
    this._services = getSendEventAliases(authService.send);
    this._authService = authService;
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
