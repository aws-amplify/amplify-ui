import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { AuthState } from '../../common/types';
import { AmplifyOverrideDirective } from '../../directives/amplify-override.directive';
import {
  StateMachineService,
  AuthenticatorContextService
} from '../../services';
import { CustomComponents, OnSubmitHook } from '../../common';
import { State } from 'xstate';

@Component({
  selector: 'amplify-authenticator',
  templateUrl: './amplify-authenticator.component.html',
  providers: [AuthenticatorContextService], // make sure custom components are scoped to this authenticator only
  encapsulation: ViewEncapsulation.None
})
export class AmplifyAuthenticatorComponent implements AfterContentInit {
  @Input() initialAuthState: AuthState = 'signIn';
  @Output() onSignInInput = new EventEmitter<any>();
  @Output() onSignInSubmit = new EventEmitter<any>();
  @Output() onSignUpInput = new EventEmitter<any>();
  @Output() onSignUpSubmit = new EventEmitter<any>();
  @HostBinding('attr.data-ui-authenticator') dataAttr = '';
  @ContentChildren(AmplifyOverrideDirective)
  private customComponentQuery: QueryList<AmplifyOverrideDirective> = null;
  public customComponents: CustomComponents = {};
  public context = () => ({
    user: this.stateMachine.user,
    username: this.stateMachine.user?.username
  }); // use a function so that this is reevaluated whenever context is requested

  constructor(
    private stateMachine: StateMachineService,
    private contextService: AuthenticatorContextService
  ) {}

  /**
   * Lifecycle Methods
   */

  ngAfterContentInit(): void {
    this.contextService.customComponents = this.mapCustomComponents(
      this.customComponentQuery
    );
    this.customComponents = this.contextService.customComponents;
    this.contextService.props = {
      signIn: {
        onSignInInput: this.onSignInInput,
        onSignInSubmit: this.onSignInSubmit
      },
      signUp: {
        onSignUpInput: this.onSignUpInput,
        onSignUpSubmit: this.onSignUpSubmit
      }
    };
  }

  /**
   * Class Functions
   */

  public getAuthState(): State<any> {
    return this.stateMachine.authState;
  }

  private mapCustomComponents(
    componentQuery: QueryList<AmplifyOverrideDirective>
  ): Record<string, TemplateRef<any>> {
    if (!componentQuery) return {};
    const customComponents: Record<string, TemplateRef<any>> = {};
    componentQuery.forEach(component => {
      customComponents[component.name] = component.template;
    });

    return customComponents;
  }
}
