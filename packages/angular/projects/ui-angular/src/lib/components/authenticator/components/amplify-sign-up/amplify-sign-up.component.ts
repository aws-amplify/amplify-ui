import {
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AuthenticatorService } from '../../../../services/authenticator.service';
import { Subscription } from 'xstate';
import {
  AuthMachineState,
  getActorContext,
  getActorState,
  SignUpContext,
  SignUpState,
  translate,
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

  private authSubscription: Subscription;

  // translated texts
  public createAccountText = translate('Create Account');

  constructor(private authenticator: AuthenticatorService) {}

  public get context() {
    const { change, signIn, submit } = this.authenticator.services;
    const remoteError = this.remoteError;

    return {
      change,
      remoteError,
      signIn,
      submit,
    };
  }

  ngOnInit(): void {
    this.authSubscription = this.authenticator.subscribe((state) =>
      this.onStateUpdate(state)
    );
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  private onStateUpdate(state: AuthMachineState): void {
    const actorState: SignUpState = getActorState(state);
    const actorContext: SignUpContext = getActorContext(state);
    this.remoteError = actorContext.remoteError;
    this.isPending = !actorState.matches({
      signUp: {
        submission: 'idle',
      },
    });
  }

  onInput(event: Event): void {
    event.preventDefault();
    const { name, value } = <HTMLInputElement>event.target;
    this.authenticator.send({
      type: 'CHANGE',
      data: { name, value },
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.authenticator.send('SUBMIT');
  }
}
