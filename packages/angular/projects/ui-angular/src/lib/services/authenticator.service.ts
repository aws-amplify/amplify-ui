import { Injectable, OnDestroy } from '@angular/core';
import { Logger } from '@aws-amplify/core';
import {
  AuthContext,
  AuthenticatorMachineOptions,
  AuthEvent,
  AuthInterpreter,
  AuthMachineState,
  createAuthenticatorMachine,
  getSendEventAliases,
  getServiceContext,
} from '@aws-amplify/ui';
import { Event, interpret, Subscription } from 'xstate';
import { AuthSubscriptionCallback } from '../common';

const logger = new Logger('state-machine');

/**
 * AuthenticatorService provides access to the authenticator state and context.
 */
@Injectable({
  providedIn: 'root', // ensure we have a singleton service
})
export class AuthenticatorService implements OnDestroy {
  private _authState: AuthMachineState;
  private _authService: AuthInterpreter;
  private _sendEventAliases: ReturnType<typeof getSendEventAliases>;
  private _subscription: Subscription;
  private _facade: ReturnType<typeof getServiceContext>;

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
    }).start();

    this._subscription = authService.subscribe((state) => {
      this._facade = getServiceContext(state);
    });

    this._sendEventAliases = getSendEventAliases(authService.send);
    this._authService = authService;
  }

  ngOnDestroy(): void {
    if (this._subscription) this._subscription.unsubscribe();
  }

  public get error() {
    return this._facade?.error;
  }

  public get hasValidationErrors() {
    return this._facade?.hasValidationErrors;
  }

  public get isPending() {
    return this._facade?.isPending;
  }

  public get route() {
    return this._facade?.route;
  }

  public get user() {
    return this._facade?.user;
  }

  public validationErrors() {
    return this._facade?.validationErrors;
  }

  public get services() {
    return this._sendEventAliases;
  }

  /** @deprecated For internal use only */
  public get authState(): AuthMachineState {
    return this._authState;
  }

  /** @deprecated For internal use only */
  public get authService(): AuthInterpreter {
    return this._authService;
  }

  /** @deprecated For internal use only */
  public get context(): AuthContext {
    return this._authState.context;
  }

  /** @deprecated For internal use only */
  public subscribe(callback: AuthSubscriptionCallback) {
    if (this._authService) {
      return this._authService.subscribe(callback);
    } else {
      logger.error(
        'Subscription attempted before machine was created. This is likely a bug on the library, please consider filing a bug.'
      );
    }
  }

  /** @deprecated For internal use only */
  public send(event: Event<AuthEvent>) {
    this.authService.send(event);
  }
}
