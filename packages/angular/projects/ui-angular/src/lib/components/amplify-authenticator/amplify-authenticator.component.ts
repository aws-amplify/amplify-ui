import {
  AfterContentInit,
  Component,
  ContentChildren,
  HostBinding,
  Input,
  QueryList,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { AuthState } from '../../common/types';
import { AmplifyOverrideDirective } from '../../directives/amplify-override.directive';
import { StateMachineService, AuthPropService } from '../../services';
import { CustomComponents } from '../../common';
import { getActorState } from '@aws-amplify/ui-core';

@Component({
  selector: 'authenticator',
  templateUrl: './amplify-authenticator.component.html',
  providers: [AuthPropService], // make sure custom components are scoped to this authenticator only
  encapsulation: ViewEncapsulation.None,
})
export class AmplifyAuthenticatorComponent implements AfterContentInit {
  /**
   * TODO: Add back custom events
   */

  @Input() initialAuthState: AuthState = 'signIn';
  @HostBinding('attr.data-amplify-authenticator') dataAttr = '';
  @ContentChildren(AmplifyOverrideDirective)
  private customComponentQuery: QueryList<AmplifyOverrideDirective> = null;
  public customComponents: CustomComponents = {};
  public context = () => ({
    user: this.stateMachine.user,
    username: this.stateMachine.user?.username,
  }); // use a function so that this is reevaluated whenever context is requested

  constructor(
    private stateMachine: StateMachineService,
    private contextService: AuthPropService
  ) {
    console.log('hi');
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
