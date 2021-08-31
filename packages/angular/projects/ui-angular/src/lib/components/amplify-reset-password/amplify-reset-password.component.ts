import {
  AfterContentInit,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { AuthMachineState, getActorState, SignInState } from '@aws-amplify/ui';
import { Subscription } from 'xstate';
import { AuthPropService } from '../../services/authenticator-context.service';
import { StateMachineService } from '../../services/state-machine.service';

@Component({
  selector: 'amplify-reset-password',
  templateUrl: './amplify-reset-password.component.html',
})
export class AmplifyResetPasswordComponent
  implements OnInit, AfterContentInit, OnDestroy
{
  @HostBinding('attr.data-amplify-authenticator-resetPassword') dataAttr = '';
  @Input() public headerText = 'Reset your password';

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

  ngAfterContentInit() {
    this.customComponents = this.contextService.customComponents;
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
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
    this.stateMachine.send('SUBMIT');
  }

  onStateUpdate(state: AuthMachineState): void {
    const actorState: SignInState = getActorState(state);
    this.remoteError = actorState.context.remoteError;
    this.isPending = !actorState.matches('resetPassword.edit');
  }
}
