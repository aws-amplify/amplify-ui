import {
  AfterContentInit,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { Subscription } from 'xstate';
import { Logger } from '@aws-amplify/core';
import {
  AuthMachineState,
  getActorContext,
  getActorState,
} from '@aws-amplify/ui-core';
import { AuthPropService, StateMachineService } from '../../services';

const logger = new Logger('ForceNewPassword');

@Component({
  selector: 'amplify-force-new-password',
  templateUrl: './amplify-force-new-password.component.html',
})
export class AmplifyForceNewPasswordComponent
  implements OnInit, AfterContentInit, OnDestroy
{
  @HostBinding('attr.data-amplify-authenticator-forcenewpassword')
  dataAttr = '';
  @Input() public headerText = 'Change Password';

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
    const actorState = getActorState(state);
    this.remoteError = actorState.context.remoteError;
    this.isPending = !actorState.matches('forceNewPassword.edit');
  }

  toSignIn(): void {
    this.stateMachine.send('SIGN_IN');
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
    const { formValues } = getActorContext(this.stateMachine.authState);

    this.stateMachine.send({
      type: 'SUBMIT',
      data: formValues,
    });
  }
}
