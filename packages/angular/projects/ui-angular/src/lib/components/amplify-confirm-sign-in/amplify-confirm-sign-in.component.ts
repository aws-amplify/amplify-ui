import {
  AfterContentInit,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { Logger } from '@aws-amplify/core';
import { StateMachineService } from '../../services/state-machine.service';
import { AuthPropService } from '../../services/authenticator-context.service';
import { Subscription } from 'xstate';
import {
  AuthChallengeNames,
  AuthMachineState,
  getActorContext,
  getActorState,
  SignInContext,
  SignInState,
} from '@aws-amplify/ui-core';

const logger = new Logger('ConfirmSignIn');

@Component({
  selector: 'amplify-confirm-sign-in',
  templateUrl: './amplify-confirm-sign-in.component.html',
})
export class AmplifyConfirmSignInComponent
  implements OnInit, OnDestroy, AfterContentInit
{
  @HostBinding('attr.data-amplify-authenticator-confirmsignin') dataAttr = '';

  public customComponents: Record<string, TemplateRef<any>> = {};
  public remoteError = '';
  public isPending = false;
  public context = () => ({});
  public headerText = '';

  private authSubscription: Subscription;

  constructor(
    private stateMachine: StateMachineService,
    private contextService: AuthPropService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.stateMachine.authService.subscribe((state) => {
      this.onStateUpdate(state);
    });
    this.setHeaderText();
  }

  ngAfterContentInit(): void {
    this.customComponents = this.contextService.customComponents;
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  setHeaderText(): void {
    const state = this.stateMachine.authState;
    const actorContext: SignInContext = getActorContext(state);
    const { challengeName } = actorContext;
    switch (challengeName) {
      case AuthChallengeNames.SOFTWARE_TOKEN_MFA:
        // TODO: this string should be centralized and translated from ui-core.
        this.headerText = 'Confirm TOTP Code';
        break;
      case AuthChallengeNames.SMS_MFA:
        this.headerText = 'Confirm SMS Code';
        break;
      default:
        logger.error('Unexpected challengeName', challengeName);
    }
  }

  onStateUpdate(state: AuthMachineState): void {
    const actorState: SignInState = getActorState(state);
    this.remoteError = actorState.context.remoteError;
    this.isPending = !actorState.matches('confirmSignIn.edit');
  }

  onInput(event: Event) {
    event.preventDefault();
    const { name, value } = <HTMLInputElement>event.target;
    this.stateMachine.send({
      type: 'CHANGE',
      data: { name, value },
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    // TODO: handle form data within the state machine
    const formData = new FormData(event.target as HTMLFormElement);
    this.stateMachine.send({
      type: 'SUBMIT',
      data: Object.fromEntries(formData),
    });
  }

  toSignIn() {
    this.stateMachine.send('SIGN_IN');
  }
}
