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
import {
  AuthMachineState,
  getActorState,
  SignInState,
  translate,
} from '@aws-amplify/ui';
import { Subscription } from 'xstate';
import { AuthenticatorService } from '../../../../services/state-machine.service';
import { AuthPropService } from '../../../../services/authenticator-context.service';
import { getAttributeMap } from '../../../../common';
import { nanoid } from 'nanoid';
@Component({
  selector: 'amplify-verify-user',
  templateUrl: './amplify-verify-user.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AmplifyVerifyUserComponent
  implements AfterContentInit, OnInit, OnDestroy
{
  @HostBinding('attr.data-amplify-authenticator-verifyuser') dataAttr = '';
  @Input() public headerText = translate(
    'Account recovery requires verified contact information'
  );

  public customComponents: Record<string, TemplateRef<any>> = {};
  public unverifiedAttributes = {};
  public remoteError = '';
  public isPending = false;
  public labelId = nanoid(12);

  private authSubscription: Subscription;

  // translated texts
  public skipText = translate('Skip');
  public verifyText = translate('Verify');

  constructor(
    private authService: AuthenticatorService,
    private contextService: AuthPropService
  ) {}

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

  onStateUpdate(state: AuthMachineState): void {
    const actorState: SignInState = getActorState(state);
    this.unverifiedAttributes = actorState.context.unverifiedAttributes;
    this.remoteError = actorState.context.remoteError;
    this.isPending = !actorState.matches('verifyUser.edit');
  }

  public get context() {
    const { change, skip, submit } = this.authService.services;
    const remoteError = this.remoteError;
    return { change, remoteError, skip, submit };
  }

  skipVerify(): void {
    this.authService.send('SKIP');
  }

  getLabelForAttr(authAttr: string): string {
    const attributeMap = getAttributeMap();
    const label = attributeMap[authAttr]?.label;
    return translate<string>(label);
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
    const formData = new FormData(event.target as HTMLFormElement);
    this.authService.send({
      type: 'SUBMIT',
      data: Object.fromEntries(formData),
    });
  }
}
