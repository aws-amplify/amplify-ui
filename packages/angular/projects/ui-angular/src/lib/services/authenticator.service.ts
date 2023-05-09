import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Event, interpret, Subscription } from 'xstate';

import { Auth } from 'aws-amplify';
import { Logger } from '@aws-amplify/core';
import {
  AuthContext,
  AuthEvent,
  AuthInterpreter,
  AuthMachineState,
  AuthStatus,
  createAuthenticatorMachine,
  defaultAuthHubHandler,
  getServiceFacade,
  listenToAuthHub,
} from '@aws-amplify/ui';
import { translate } from '@aws-amplify/ui';

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
  private _authStatus: AuthStatus = 'configuring';
  private _authService: AuthInterpreter;
  private _machineSubscription: Subscription;
  private _facade: ReturnType<typeof getServiceFacade>;
  private _hubSubject: Subject<void>;
  private _unsubscribeHub: () => void;

  constructor() {
    const machine = createAuthenticatorMachine();
    this._authService = interpret(machine).start();

    this.setupMachineSubscription();
    this.setupHubListener();
    this.getInitialAuthStatus();
  }

  ngOnDestroy(): void {
    if (this._machineSubscription) this._machineSubscription.unsubscribe();
    if (this._unsubscribeHub) this._unsubscribeHub();
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

  public get authStatus() {
    return this._authStatus;
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

  public get totpSecretCode() {
    return this._facade?.totpSecretCode;
  }

  /**
   * Service facades
   */
  public get initializeMachine() {
    return this._facade.initializeMachine;
  }

  public get updateForm() {
    return this._facade.updateForm;
  }

  public get updateBlur() {
    return this._facade.updateBlur;
  }

  public get resendCode() {
    return this._facade.resendCode;
  }

  public get signOut() {
    return this._facade.signOut;
  }

  public get submitForm() {
    return this._facade.submitForm;
  }

  /**
   * Transition facades
   */

  public get toFederatedSignIn() {
    return this._facade.toFederatedSignIn;
  }

  public get toResetPassword() {
    return this._facade.toResetPassword;
  }

  public get toSignIn() {
    return this._facade.toSignIn;
  }

  public get toSignUp() {
    return this._facade.toSignUp;
  }

  public get skipVerification() {
    return this._facade.skipVerification;
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
    return {
      ...this._facade,
      $implicit: this._facade,
    };
  }

  /** @deprecated For internal use only */
  public get hubSubject(): Subject<void> {
    return this._hubSubject;
  }

  public subscribe(callback: AuthSubscriptionCallback): Subscription {
    if (!this._authService) {
      logger.error(
        'Subscription attempted before machine was created. This is likely a bug on the library, please consider filing a bug.'
      );
    }

    const subscription = this._authService.subscribe(() => {
      callback(this._facade);
    });
    return subscription;
  }

  /** @deprecated For internal use only */
  public send(event: Event<AuthEvent>) {
    this.authService.send(event);
  }

  private async getInitialAuthStatus(): Promise<void> {
    try {
      await Auth.currentAuthenticatedUser();
      this._authStatus = 'authenticated';
    } catch (e) {
      this._authStatus = 'unauthenticated';
    }
  }

  private setupHubListener(): void {
    this._hubSubject = new Subject<void>();

    const onSignIn = () => {
      this._authStatus = 'authenticated';
    };
    const onSignOut = () => {
      this._authStatus = 'unauthenticated';
    };

    this._unsubscribeHub = listenToAuthHub(
      this._authService,
      async (data, service) => {
        await defaultAuthHubHandler(data, service, { onSignIn, onSignOut });
        this._hubSubject.next();
      }
    );
  }

  private setupMachineSubscription(): void {
    this._machineSubscription = this._authService.subscribe(
      (state: unknown) => {
        const newState = state as AuthMachineState;
        this._authState = newState;
        this._facade = getServiceFacade({
          send: this._authService.send,
          state: newState,
        });
      }
    );
  }
}
