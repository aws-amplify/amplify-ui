import {
  AfterContentInit,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { AuthenticatorService } from '../../../../services/state-machine.service';
import { AuthPropService } from '../../../../services/authenticator-context.service';
import { Subscription } from 'xstate';
import { AuthMachineState, getActorState, SignUpState } from '@aws-amplify/ui';
import { getActorContext } from '@aws-amplify/ui';
import { SignUpContext } from '@aws-amplify/ui';
import { translate } from '@aws-amplify/ui';

@Component({
  selector: 'amplify-sign-up',
  templateUrl: './amplify-sign-up.component.html',
})
export class AmplifySignUpComponent
  implements AfterContentInit, OnInit, OnDestroy
{
  @HostBinding('attr.data-amplify-authenticator-signup') dataAttr = '';
  @Input() headerText = translate('Create a new account');
  public customComponents: Record<string, TemplateRef<any>>;
  public remoteError = '';
  public isPending = false;

  private authSubscription: Subscription;

  // translated texts
  public createAccountText = translate('Create Account');

  constructor(
    private authService: AuthenticatorService,
    private contextService: AuthPropService
  ) {}

  public get context() {
    const { change, signIn, submit } = this.authService.services;
    const remoteError = this.remoteError;

    return {
      change,
      remoteError,
      signIn,
      submit,
    };
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.authService.subscribe((state) =>
      this.onStateUpdate(state)
    );
  }

  ngAfterContentInit(): void {
    this.customComponents = this.contextService.customComponents;
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
    this.authService.send({
      type: 'CHANGE',
      data: { name, value },
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.authService.send('SUBMIT');
  }
}
