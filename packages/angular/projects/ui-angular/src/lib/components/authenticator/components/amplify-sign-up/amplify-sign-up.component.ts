import {
  AfterContentInit,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { StateMachineService } from '@/services/state-machine.service';
import { AuthPropService } from '@/services/authenticator-context.service';
import { isEmpty } from 'lodash';
import { Subscription } from 'xstate';
import {
  AuthMachineState,
  getActorState,
  getConfiguredAliases,
  SignUpState,
  ValidationError,
} from '@aws-amplify/ui';
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
  public primaryAlias = '';
  public secondaryAliases: string[] = [];
  public validationError: ValidationError = {};

  private authSubscription: Subscription;

  // translated texts
  public createAccountText = translate('Create Account');

  constructor(
    private stateMachine: StateMachineService,
    private contextService: AuthPropService
  ) {}

  public get context() {
    const { change, signIn, submit } = this.stateMachine.services;
    const remoteError = this.remoteError;
    const validationError = this.validationError;

    return {
      change,
      remoteError,
      signIn,
      submit,
      validationError,
    };
  }

  ngOnInit(): void {
    this.authSubscription = this.stateMachine.authService.subscribe((state) =>
      this.onStateUpdate(state)
    );

    const context = this.stateMachine.context;
    const { primaryAlias, secondaryAliases } = getConfiguredAliases(context);

    /**
     * If the login_mechanisms are configured to use ONLY username, we need
     * to ask for some sort of secondary contact information in order to
     * verify the user for Cognito. Currently matching this to how Vue is
     * set up.
     */
    if (primaryAlias === 'username' && isEmpty(secondaryAliases)) {
      secondaryAliases.push('email', 'phone_number');
    }

    this.primaryAlias = primaryAlias;
    this.secondaryAliases = secondaryAliases;
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
    this.validationError = actorContext.validationError;
    this.isPending = !actorState.matches({
      signUp: {
        submission: 'idle',
      },
    });
  }

  async onSubmit($event): Promise<void> {
    $event.preventDefault();
    this.stateMachine.send('SUBMIT');
  }

  onInput(event: Event): void {
    event.preventDefault();
    const { name, value } = <HTMLInputElement>event.target;
    this.stateMachine.send({
      type: 'CHANGE',
      data: { name, value },
    });
  }
}
