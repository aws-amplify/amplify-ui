import {
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  AuthMachineState,
  getActorState,
  SignInState,
  translate,
} from '@aws-amplify/ui';
import { Subscription } from 'xstate';
import { AuthenticatorService } from '../../../../services/state-machine.service';

@Component({
  selector: 'amplify-confirm-verify-user',
  templateUrl: './amplify-confirm-verify-user.component.html',
})
export class ConfirmVerifyUserComponent implements OnInit, OnDestroy {
  @HostBinding('attr.data-amplify-authenticator-confirmverifyuser') dataAttr =
    '';
  @Input() public headerText = translate(
    'Account recovery requires verified contact information'
  );

  public remoteError = '';
  public isPending = false;
  private authSubscription: Subscription;

  // translated texts
  public skipText = translate('Skip');
  public submitText = translate('Submit');

  constructor(private stateMachine: AuthenticatorService) {}

  ngOnInit(): void {
    this.authSubscription = this.stateMachine.authService.subscribe((state) =>
      this.onStateUpdate(state)
    );
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onStateUpdate(state: AuthMachineState): void {
    const actorState: SignInState = getActorState(state);
    this.remoteError = actorState.context.remoteError;
    this.isPending = !actorState.matches('confirmVerifyUser.edit');
  }

  public get context() {
    const { skip, submit } = this.stateMachine.services;
    const remoteError = this.remoteError;
    return { remoteError, skip, submit };
  }

  skipVerify(): void {
    this.stateMachine.send('SKIP');
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
    const formData = new FormData(event.target as HTMLFormElement);
    this.stateMachine.send({
      type: 'SUBMIT',
      data: Object.fromEntries(formData),
    });
  }
}
