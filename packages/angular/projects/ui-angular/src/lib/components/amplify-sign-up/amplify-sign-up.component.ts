import { Logger } from 'aws-amplify';
import {
  AfterContentInit,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { AuthPropService, StateMachineService } from '../../services';
import { Subscription } from 'xstate';
import { AuthMachineState, getConfiguredAliases } from '@aws-amplify/ui-core';

const logger = new Logger('SignUp');
@Component({
  selector: 'amplify-sign-up',
  templateUrl: './amplify-sign-up.component.html',
})
export class AmplifySignUpComponent
  implements AfterContentInit, OnInit, OnDestroy
{
  @HostBinding('attr.data-amplify-authenticator-signup') dataAttr = '';
  @Input() headerText = 'Create a new account';
  public customComponents: Record<string, TemplateRef<any>>;
  public context = () => ({});
  public remoteError = '';
  public isPending = false;
  public primaryAlias = '';
  public secondaryAliases: string[] = [];

  private authSubscription: Subscription;

  constructor(
    private stateMachine: StateMachineService,
    private contextService: AuthPropService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.stateMachine.authService.subscribe((state) =>
      this.onStateUpdate(state)
    );

    const context = this.stateMachine.context;
    const { primaryAlias, secondaryAliases } = getConfiguredAliases(context);

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
    this.remoteError = state.context.remoteError;
    this.isPending = state.matches({
      signUp: {
        submission: 'valid',
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

  toSignIn(): void {
    this.stateMachine.send('SIGN_IN');
  }
}
