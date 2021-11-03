import { Injectable } from '@angular/core';
import { Logger } from '@aws-amplify/core';
import {
  AuthContext,
  AuthenticatorMachineOptions,
  AuthEvent,
  AuthInterpreter,
  AuthMachineState,
  createAuthenticatorMachine,
  getSendEventAliases,
} from '@aws-amplify/ui';
import { Event, interpret } from 'xstate';
import { AuthSubscriptionCallback } from '../common';

const logger = new Logger('state-machine');

/**
 * AmplifyContextService contains access to the xstate machine
 * and custom components passed by the user.
 */
@Injectable({
  providedIn: 'root', // ensure we have a singleton service
})
export class AuthenticatorService {
  private _authState: AuthMachineState;
  private _authService: AuthInterpreter;
  private _user: Record<string, any>; // TODO: strongly type CognitoUser
  private _services: ReturnType<typeof getSendEventAliases>;

  public startMachine({
    initialState,
    loginMechanisms,
  }: AuthenticatorMachineOptions) {
    const machine = createAuthenticatorMachine({
      initialState,
      loginMechanisms,
    });

    const authService = interpret(machine, {
      devTools: process.env.NODE_ENV === 'development',
    })
      .onTransition((state) => {
        this._user = state.context.user;
        this._authState = state;
      })
      .start();

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

  /**
   * @deprecated For internal use only
   */
  public subscribe(callback: AuthSubscriptionCallback) {
    if (this._authService) {
      return this._authService.subscribe(callback);
    } else {
      logger.error(
        'Subscription attempted before machine was created. This is likely a bug on the library, please consider filing a bug.'
      );
    }
  }

  /**
   * @deprecated For internal use only
   */
  public send(event: Event<AuthEvent>) {
    this.authService.send(event);
  }
}
