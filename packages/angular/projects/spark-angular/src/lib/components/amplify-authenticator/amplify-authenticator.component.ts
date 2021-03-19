import {
  AfterContentInit,
  Component,
  ContentChild,
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

@Component({
  selector: 'amplify-authenticator',
  templateUrl: './amplify-authenticator.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AmplifyAuthenticatorComponent implements AfterContentInit, OnInit {
  @Input() initialAuthState: AuthState = 'signIn';
  @HostBinding('attr.data-spark-authenticator') dataAttr = '';
  @ContentChildren(AmplifyOverrideDirective)
  private customComponenQuery: QueryList<AmplifyOverrideDirective> = null;
  private customComponents: Record<string, TemplateRef<any>> = {};
  private authState: AuthState;

  /**
   * Lifecycle Methods
   */

  ngOnInit(): void {
    this.authState = this.initialAuthState;
  }

  ngAfterContentInit(): void {
    this.customComponents = this.mapCustomComponents(this.customComponenQuery);
  }

  /**
   * Getters
   */

  get getAuthState(): AuthState {
    return this.authState;
  }

  get getCustomComponents(): Record<string, any> {
    return this.customComponents;
  }

  /**
   * Class Functions
   */
  public updateAuthState(newAuthState: AuthState): void {
    this.authState = newAuthState;
  }

  private mapCustomComponents(
    componentQuery: QueryList<AmplifyOverrideDirective>
  ): Record<string, TemplateRef<any>> {
    if (!componentQuery) return;
    const customComponents: Record<string, TemplateRef<any>> = {};
    componentQuery.forEach((component) => {
      customComponents[component.getName] = component.template;
    });

    return customComponents;
  }
}
