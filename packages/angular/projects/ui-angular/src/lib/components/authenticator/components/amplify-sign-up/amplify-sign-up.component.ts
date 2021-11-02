import {
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AuthenticatorService } from '../../../../services/state-machine.service';
import { isEmpty } from 'lodash';
import { Subscription } from 'xstate';
import {
  AuthMachineState,
  getActorContext,
  getActorState,
  getConfiguredAliases,
  SignUpContext,
  SignUpState,
  translate,
  ValidationError,
} from '@aws-amplify/ui';

@Component({
  selector: 'amplify-sign-up',
  templateUrl: './amplify-sign-up.component.html',
})
export class AmplifySignUpComponent implements OnInit, OnDestroy {
  @Input() headerText = translate('Create a new account');

  @HostBinding('attr.data-amplify-authenticator-signup') dataAttr = '';

  public remoteError = '';
  public isPending = false;
  public primaryAlias = '';
  public secondaryAliases: string[] = [];
  public validationError: ValidationError = {};

  private authSubscription: Subscription;

  // translated texts
  public createAccountText = translate('Create Account');

  constructor(private stateMachine: AuthenticatorService) {}

  public get context() {
    const { change, signIn, submit } = this.stateMachine.services;
    const remoteError = this.remoteError;
    const validationError = this.validationError;

    return {
      change,
      remoteError,
      signIn,
      submit,
      validationError,
    };
  }

  ngOnInit(): void {
    this.authSubscription = this.stateMachine.authService.subscribe((state) =>
      this.onStateUpdate(state)
    );

    const context = this.stateMachine.context;
    const { primaryAlias, secondaryAliases } = getConfiguredAliases(context);

    /**
     * If the login_mechanisms are configured to use ONLY username, we need
     * to ask for some sort of secondary contact information in order to
     * verify the user for Cognito. Currently matching this to how Vue is
     * set up.
     */
    if (primaryAlias === 'username' && isEmpty(secondaryAliases)) {
      secondaryAliases.push('email', 'phone_number');
    }

    this.primaryAlias = primaryAlias;
    this.secondaryAliases = secondaryAliases;
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  private onStateUpdate(state: AuthMachineState): void {
    const actorState: SignUpState = getActorState(state);
    const actorContext: SignUpContext = getActorContext(state);
    this.remoteError = actorContext.remoteError;
    this.validationError = actorContext.validationError;
    this.isPending = !actorState.matches({
      signUp: {
        submission: 'idle',
      },
    });
  }

  onInput(event: Event): void {
    event.preventDefault();
    const { name, value } = <HTMLInputElement>event.target;
    this.stateMachine.send({
      type: 'CHANGE',
      data: { name, value },
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.stateMachine.send('SUBMIT');
  }
}
