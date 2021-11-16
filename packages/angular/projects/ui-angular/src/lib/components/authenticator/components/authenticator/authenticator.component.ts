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
  AuthenticatorMachineOptions,
  SocialProvider,
  translate,
} from '@aws-amplify/ui';
import { AmplifySlotDirective } from '../../../../utilities/amplify-slot/amplify-slot.directive';
import { CustomComponentsService } from '../../../../services/custom-components.service';
import { AuthenticatorService } from '../../../../services/authenticator.service';

@Component({
  selector: 'amplify-authenticator',
  templateUrl: './authenticator.component.html',
  providers: [CustomComponentsService], // make sure custom components are scoped to this authenticator only
  encapsulation: ViewEncapsulation.None,
})
export class AuthenticatorComponent implements OnInit, AfterContentInit {
  @Input() initialState: AuthenticatorMachineOptions['initialState'];
  @Input() loginMechanisms: AuthenticatorMachineOptions['loginMechanisms'];
  @Input() services: AuthenticatorMachineOptions['services'];
  @Input() signUpAttributes: AuthenticatorMachineOptions['signUpAttributes'];
  @Input() socialProviders: SocialProvider[];
  @Input() variation: 'modal' | undefined;

  @ContentChildren(AmplifySlotDirective)
  private customComponentQuery: QueryList<AmplifySlotDirective> = null;

  // translated texts
  public signInTitle = translate('Sign In');
  public signUpTitle = translate('Create Account');

  constructor(
    private authenticator: AuthenticatorService,
    private contextService: CustomComponentsService
  ) {}

  ngOnInit(): void {
    const {
      initialState,
      loginMechanisms,
      services,
      signUpAttributes,
      socialProviders,
    } = this;
    this.authenticator.startMachine({
      initialState,
      loginMechanisms,
      services,
      signUpAttributes,
      socialProviders,
    });

    /**
     * handling translations after content init, because authenticator and its
     * translations might be initialized before the main app's `ngOnInit` is run.
     */
    this.signInTitle = translate('Sign In');
    this.signUpTitle = translate('Create Account');
  }

  /**
   * Lifecycle Methods
   */
  ngAfterContentInit(): void {
    this.contextService.customComponents = this.mapCustomComponents(
      this.customComponentQuery
    );
  }

  /**
   * Class Functions
   */

  // context passed to "authenticated" slot
  public get authenticatedContext() {
    const { signOut, user } = this.authenticator;
    return { signOut, user };
  }

  public get route() {
    return this.authenticator.route;
  }

  public get variationModal() {
    return this.variation === 'modal';
  }

  public onTabChange() {
    const route = this.authenticator.route;
    if (route === 'signIn') {
      this.authenticator.toSignUp();
    } else {
      this.authenticator.toSignIn();
    }
  }

  private mapCustomComponents(
    componentQuery: QueryList<AmplifySlotDirective>
  ): Record<string, TemplateRef<any>> {
    if (!componentQuery) return {};
    const customComponents: Record<string, TemplateRef<any>> = {};
    componentQuery.forEach((component) => {
      customComponents[component.name] = component.template;
    });

    return customComponents;
  }
}
