import { Injectable, OnDestroy } from '@angular/core';
import { Logger } from '@aws-amplify/core';
import {
  AuthContext,
  AuthEvent,
  AuthInterpreter,
  AuthMachineState,
  createAuthenticatorMachine,
  getSendEventAliases,
  getServiceContextFacade,
  listenToAuthHub,
} from '@aws-amplify/ui';
import { Event, interpret, Subscription } from 'xstate';
import { AuthSubscriptionCallback } from '../common';
import { translate } from '@aws-amplify/ui';

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
  private _machineSubscription: Subscription;
  private _hubSubscription: ReturnType<typeof listenToAuthHub>;
  private _facade: ReturnType<typeof getServiceContextFacade>;

  constructor() {
    const machine = createAuthenticatorMachine();

    const authService = interpret(machine).start();

    this._machineSubscription = authService.subscribe((state) => {
      this._authState = state;
      this._facade = getServiceContextFacade(state);
    });

    this._hubSubscription = listenToAuthHub(authService.send);
    this._sendEventAliases = getSendEventAliases(authService.send);
    this._authService = authService;
  }

  ngOnDestroy(): void {
    if (this._machineSubscription) this._machineSubscription.unsubscribe();
    if (this._hubSubscription) this._hubSubscription();
  }

  /**
   * Context facades
   */

  public get error() {
    return translate(this._facade?.error);
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

  public get validationErrors() {
    return this._facade?.validationErrors;
  }

  public get codeDeliveryDetails() {
    return this._facade?.codeDeliveryDetails;
  }

  /**
   * Service facades
   */

  public get updateForm() {
    return this._sendEventAliases.updateForm;
  }

  public get updateBlur() {
    return this._sendEventAliases.updateBlur;
  }

  public get resendCode() {
    return this._sendEventAliases.resendCode;
  }

  public get signOut() {
    return this._sendEventAliases.signOut;
  }

  public get submitForm() {
    return this._sendEventAliases.submitForm;
  }

  /**
   * Transition facades
   */

  public get toFederatedSignIn() {
    return this._sendEventAliases.toFederatedSignIn;
  }

  public get toResetPassword() {
    return this._sendEventAliases.toResetPassword;
  }

  public get toSignIn() {
    return this._sendEventAliases.toSignIn;
  }

  public get toSignUp() {
    return this._sendEventAliases.toSignUp;
  }

  public get skipVerification() {
    return this._sendEventAliases.skipVerification;
  }

  /**
   * Internal utility functions
   */

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
  public get slotContext() {
    const slotContext = {
      ...this._facade,
      ...this._sendEventAliases,
    };

    return {
      ...slotContext,
      $implicit: { ...slotContext },
    };
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
