import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { getActorState, translations } from '@aws-amplify/ui';
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
export class AmplifyAuthenticatorComponent implements AfterContentInit {
  /**
   * TODO: Add back custom events
   */

  @Input() initialAuthState: AuthState = 'signIn';
  @ContentChildren(AmplifyOverrideDirective)
  private customComponentQuery: QueryList<AmplifyOverrideDirective> = null;
  public customComponents: CustomComponents = {};
  constructor(
    private stateMachine: StateMachineService,
    private contextService: AuthPropService
  ) {
    I18n.putVocabularies(translations);
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
