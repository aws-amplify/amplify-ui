import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import {
  getActorState,
  LoginMechanism,
  translate,
  translations,
} from '@aws-amplify/ui';
import { I18n } from 'aws-amplify';
import { CustomComponents } from '../../common';
import { AuthState } from '../../common/types';
import { AmplifyOverrideDirective } from '../../directives/amplify-override.directive';
import { AuthPropService } from '../../services/authenticator-context.service';
import { StateMachineService } from '../../services/state-machine.service';

@Component({
  selector: 'amplify-authenticator',
  templateUrl: './amplify-authenticator.component.html',
  providers: [AuthPropService], // make sure custom components are scoped to this authenticator only
  encapsulation: ViewEncapsulation.None,
})
export class AmplifyAuthenticatorComponent implements OnInit, AfterContentInit {
  /**
   * TODO: Add back custom events
   */

  @Input() initialState: AuthState = 'signIn';
  @Input() loginMechanisms: LoginMechanism[] = ['username'];

  @ContentChildren(AmplifyOverrideDirective)
  private customComponentQuery: QueryList<AmplifyOverrideDirective> = null;
  public customComponents: CustomComponents = {};

  // translated texts
  public signInTitle = translate('Sign In');
  public signUpTitle = translate('Create Account');

  constructor(
    private stateMachine: StateMachineService,
    private contextService: AuthPropService
  ) {}

  ngOnInit(): void {
    I18n.putVocabularies(translations);
    this.stateMachine.startMachine(this.loginMechanisms);
  }

  /**
   * Lifecycle Methods
   */
  ngAfterContentInit(): void {
    this.contextService.customComponents = this.mapCustomComponents(
      this.customComponentQuery
    );
    this.customComponents = this.contextService.customComponents;
  }

  /**
   * Class Functions
   */
  public get context() {
    const { signOut } = this.stateMachine.services;
    const user = this.stateMachine.user;
    return { signOut, user };
  }

  public get actorState() {
    return getActorState(this.stateMachine.authState);
  }

  public get authenticatorState() {
    return this.stateMachine.authState;
  }

  public onTabChange() {
    const currentState = this.stateMachine.authState.value;
    if (currentState === 'signIn') {
      this.stateMachine.send('SIGN_UP');
    } else {
      this.stateMachine.send('SIGN_IN');
    }
  }

  private mapCustomComponents(
    componentQuery: QueryList<AmplifyOverrideDirective>
  ): Record<string, TemplateRef<any>> {
    if (!componentQuery) return {};
    const customComponents: Record<string, TemplateRef<any>> = {};
    componentQuery.forEach((component) => {
      customComponents[component.name] = component.template;
    });

    return customComponents;
  }
}
