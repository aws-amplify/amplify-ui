import { Logger } from '@aws-amplify/core';
import {
  AfterContentInit,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { StateMachineService } from '../../services/state-machine.service';
import { AuthPropService } from '../../services/authenticator-context.service';
import { Subscription } from 'xstate';
import {
  AuthMachineState,
  getActorState,
  SignInState,
} from '@aws-amplify/ui-core';

const logger = new Logger('SignIn');

@Component({
  selector: 'amplify-sign-in',
  templateUrl: './amplify-sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AmplifySignInComponent
  implements AfterContentInit, OnInit, OnDestroy
{
  @HostBinding('attr.data-amplify-authenticator-signin') dataAttr = '';
  @Input() public headerText = 'Sign in to your account';

  public customComponents: Record<string, TemplateRef<any>> = {};
  public remoteError = '';
  public isPending = false;
  public context = () => ({});

  private authSubscription: Subscription;

  constructor(
    private stateMachine: StateMachineService,
    private contextService: AuthPropService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.stateMachine.authService.subscribe((state) =>
      this.onStateUpdate(state)
    );
  }

  ngAfterContentInit(): void {
    this.customComponents = this.contextService.customComponents;
  }

  ngOnDestroy(): void {
    logger.log('sign in destroyed, unsubscribing from state machine...');
    this.authSubscription.unsubscribe();
  }

  onStateUpdate(state: AuthMachineState): void {
    const actorState: SignInState = getActorState(state);
    this.remoteError = actorState.context.remoteError;
    this.isPending = !actorState.matches('signIn.edit');
  }

  toSignUp(): void {
    this.stateMachine.send('SIGN_UP');
  }

  toResetPassword(): void {
    this.stateMachine.send('RESET_PASSWORD');
  }

  onInput(event: Event) {
    event.preventDefault();
    const { name, value } = <HTMLInputElement>event.target;
    this.stateMachine.send({
      type: 'CHANGE',
      data: { name, value },
    });
  }

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();

    this.stateMachine.send({
      type: 'SUBMIT',
    });
  }
}
