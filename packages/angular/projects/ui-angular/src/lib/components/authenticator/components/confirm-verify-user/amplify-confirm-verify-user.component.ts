import {
  AfterContentInit,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import {
  AuthMachineState,
  getActorState,
  SignInState,
  translate,
} from '@aws-amplify/ui';
import { Subscription } from 'xstate';
import { AuthPropService } from '../../../../services/authenticator-context.service';
import { AuthenticatorService } from '../../../../services/state-machine.service';

@Component({
  selector: 'amplify-confirm-verify-user',
  templateUrl: './amplify-confirm-verify-user.component.html',
})
export class ConfirmVerifyUserComponent
  implements OnInit, AfterContentInit, OnDestroy
{
  @HostBinding('attr.data-amplify-authenticator-confirmverifyuser') dataAttr =
    '';
  @Input() public headerText = translate(
    'Account recovery requires verified contact information'
  );

  public customComponents: Record<string, TemplateRef<any>> = {};
  public remoteError = '';
  public isPending = false;
  private authSubscription: Subscription;

  // translated texts
  public skipText = translate('Skip');
  public submitText = translate('Submit');

  constructor(
    private authService: AuthenticatorService,
    private contextService: AuthPropService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.authService.subscribe((state) =>
      this.onStateUpdate(state)
    );
  }

  ngAfterContentInit() {
    this.customComponents = this.contextService.customComponents;
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
    const { skip, submit } = this.authService.services;
    const remoteError = this.remoteError;
    return { remoteError, skip, submit };
  }

  skipVerify(): void {
    this.authService.send('SKIP');
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
