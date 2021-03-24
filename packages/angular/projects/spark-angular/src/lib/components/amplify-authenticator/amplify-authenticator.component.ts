import {
  AfterContentInit,
  Component,
  ContentChildren,
  HostBinding,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { AuthState } from '../../common/auth-types';
import { AmplifyOverrideDirective } from '../../directives/amplify-override.directive';
import { StateMachineService } from '../../services/state-machine.service';
import { ComponentsProviderService } from '../../services/components-provider.service';
import { CustomComponents } from '../../common';

@Component({
  selector: 'amplify-authenticator',
  templateUrl: './amplify-authenticator.component.html',
  providers: [ComponentsProviderService], // make sure custom components are scoped to this authenticator only
  encapsulation: ViewEncapsulation.None,
})
export class AmplifyAuthenticatorComponent implements AfterContentInit, OnInit {
  @Input() initialAuthState: AuthState = 'signIn';
  @HostBinding('attr.data-spark-authenticator') dataAttr = '';
  @ContentChildren(AmplifyOverrideDirective)
  private customComponenQuery: QueryList<AmplifyOverrideDirective> = null;
  public customComponents: CustomComponents = {};

  constructor(
    private stateMachine: StateMachineService,
    private componentsProvider: ComponentsProviderService
  ) {}

  /**
   * Lifecycle Methods
   */

  ngOnInit(): void {
    this.stateMachine.authState = this.initialAuthState;
  }

  ngAfterContentInit(): void {
    this.componentsProvider.customComponents = this.mapCustomComponents(
      this.customComponenQuery
    );
    this.customComponents = this.componentsProvider.customComponents;
  }

  /**
   * Class Functions
   */

  public getAuthState(): AuthState {
    return this.stateMachine.authState;
  }

  private mapCustomComponents(
    componentQuery: QueryList<AmplifyOverrideDirective>
  ): Record<string, TemplateRef<any>> {
    if (!componentQuery) return {};
    const customComponents: Record<string, TemplateRef<any>> = {};
    componentQuery.forEach((component) => {
      customComponents[component.getName] = component.template;
    });

    return customComponents;
  }
}
