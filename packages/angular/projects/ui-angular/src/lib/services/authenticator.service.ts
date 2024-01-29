import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Event, interpret, Subscription } from 'xstate';

import { AuthUser, getCurrentUser } from 'aws-amplify/auth';
import { ConsoleLogger as Logger } from 'aws-amplify/utils';
import {
  AuthContext,
  AuthenticatorServiceFacade,
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

import { AuthSubscriptionCallback } from '../common/types';

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

    this.getInitialAuthStatus();
    this.setupMachineSubscription();
    this.setupHubListener();
  }

  /**
   * Context facades
   */

  public get error(): AuthenticatorServiceFacade['error'] {
    return translate(this._facade?.error);
  }

  public get hasValidationErrors(): AuthenticatorServiceFacade['hasValidationErrors'] {
    return this._facade?.hasValidationErrors;
  }

  public get isPending(): AuthenticatorServiceFacade['isPending'] {
    return this._facade?.isPending;
  }

  public get route(): AuthenticatorServiceFacade['route'] {
    return this._facade?.route;
  }

  public get authStatus(): AuthenticatorServiceFacade['authStatus'] {
    return this._authStatus;
  }

  public get user(): AuthUser {
    return this._facade?.user;
  }

  public get username(): string {
    return this._facade?.username;
  }

  public get validationErrors(): AuthenticatorServiceFacade['validationErrors'] {
    return this._facade?.validationErrors;
  }

  public get codeDeliveryDetails(): AuthenticatorServiceFacade['codeDeliveryDetails'] {
    return this._facade?.codeDeliveryDetails;
  }

  public get totpSecretCode(): AuthenticatorServiceFacade['totpSecretCode'] {
    return this._facade?.totpSecretCode;
  }

  /**
   * Service facades
   */

  public get initializeMachine(): AuthenticatorServiceFacade['initializeMachine'] {
    return this._facade.initializeMachine;
  }

  public get updateForm(): AuthenticatorServiceFacade['updateForm'] {
    return this._facade.updateForm;
  }

  public get updateBlur(): AuthenticatorServiceFacade['updateBlur'] {
    return this._facade.updateBlur;
  }

  public get resendCode(): AuthenticatorServiceFacade['resendCode'] {
    return this._facade.resendCode;
  }

  public get signOut(): AuthenticatorServiceFacade['signOut'] {
    return this._facade.signOut;
  }

  public get submitForm(): AuthenticatorServiceFacade['submitForm'] {
    return this._facade.submitForm;
  }

  /**
   * Transition facades
   */

  public get toFederatedSignIn(): AuthenticatorServiceFacade['toFederatedSignIn'] {
    return this._facade.toFederatedSignIn;
  }

  public get toForgotPassword(): AuthenticatorServiceFacade['toForgotPassword'] {
    return this._facade.toForgotPassword;
  }

  public get toSignIn(): AuthenticatorServiceFacade['toSignIn'] {
    return this._facade.toSignIn;
  }

  public get toSignUp(): AuthenticatorServiceFacade['toSignUp'] {
    return this._facade.toSignUp;
  }

  public get skipVerification(): AuthenticatorServiceFacade['skipVerification'] {
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
  public get slotContext(): AuthenticatorServiceFacade & {
    $implicit: AuthenticatorServiceFacade;
  } {
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

  ngOnDestroy(): void {
    if (this._machineSubscription) this._machineSubscription.unsubscribe();
    if (this._unsubscribeHub) this._unsubscribeHub();
  }

  /** @deprecated For internal use only */
  public send(event: Event<AuthEvent>): void {
    this.authService.send(event);
  }

  private async getInitialAuthStatus(): Promise<void> {
    try {
      await getCurrentUser();
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
      (data, service) => {
        defaultAuthHubHandler(data, service, { onSignIn, onSignOut });
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
