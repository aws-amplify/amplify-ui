import {
  AfterContentInit,
  Component,
  ContentChildren,
  HostBinding,
  Input,
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
  @Input() onSignIn: OnSubmitHook;
  @Input() onSignUp: OnSubmitHook;
  @HostBinding('attr.data-ui-authenticator') dataAttr = '';
  @ContentChildren(AmplifyOverrideDirective)
  private customComponentQuery: QueryList<AmplifyOverrideDirective> = null;
  public customComponents: CustomComponents = {};

  constructor(
    private stateMachine: StateMachineService,
    private context: AuthenticatorContextService
  ) {}

  /**
   * Lifecycle Methods
   */

  ngAfterContentInit(): void {
    this.context.customComponents = this.mapCustomComponents(
      this.customComponentQuery
    );
    this.customComponents = this.context.customComponents;
    this.context.props = {
      signIn: {
        onSignIn: this.onSignIn
      },
      signUp: {
        onSignUp: this.onSignUp
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
