import {
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  AuthMachineState,
  getActorState,
  SignInState,
  translate,
} from '@aws-amplify/ui';
import { Subscription } from 'xstate';
import { AuthenticatorService } from '../../../../services/authenticator.service';
import { getAttributeMap } from '../../../../common';
import { nanoid } from 'nanoid';
@Component({
  selector: 'amplify-verify-user',
  templateUrl: './amplify-verify-user.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AmplifyVerifyUserComponent implements OnInit, OnDestroy {
  @HostBinding('attr.data-amplify-authenticator-verifyuser') dataAttr = '';
  @Input() public headerText = translate(
    'Account recovery requires verified contact information'
  );

  public unverifiedAttributes = {};
  public remoteError = '';
  public isPending = false;
  public labelId = nanoid(12);

  private authSubscription: Subscription;

  // translated texts
  public skipText = translate('Skip');
  public verifyText = translate('Verify');

  constructor(private authenticator: AuthenticatorService) {}

  ngOnInit(): void {
    this.authSubscription = this.authenticator.subscribe((state) =>
      this.onStateUpdate(state)
    );
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onStateUpdate(state: AuthMachineState): void {
    const actorState = getActorState(state) as SignInState;
    this.unverifiedAttributes = actorState.context.unverifiedAttributes;
    this.remoteError = actorState.context.remoteError;
    this.isPending = !actorState.matches('verifyUser.edit');
  }

  public get context() {
    const { change, skip, submit } = this.authenticator.services;
    const remoteError = this.remoteError;
    return { change, remoteError, skip, submit };
  }

  skipVerify(): void {
    this.authenticator.send('SKIP');
  }

  getLabelForAttr(authAttr: string): string {
    const attributeMap = getAttributeMap();
    const label = attributeMap[authAttr]?.label;
    return translate<string>(label);
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
    const formData = new FormData(event.target as HTMLFormElement);
    this.authenticator.send({
      type: 'SUBMIT',
      data: Object.fromEntries(formData),
    });
  }
}
