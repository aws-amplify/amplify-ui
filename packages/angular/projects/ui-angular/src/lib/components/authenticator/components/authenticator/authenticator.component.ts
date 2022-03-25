import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  OnDestroy,
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
export class AuthenticatorComponent
  implements OnInit, AfterContentInit, OnDestroy
{
  @Input() formFields: AuthenticatorMachineOptions['formFields'];
  @Input() initialState: AuthenticatorMachineOptions['initialState'];
  @Input() loginMechanisms: AuthenticatorMachineOptions['loginMechanisms'];
  @Input() services: AuthenticatorMachineOptions['services'];
  @Input() signUpAttributes: AuthenticatorMachineOptions['signUpAttributes'];
  @Input() socialProviders: SocialProvider[];
  @Input() variation: 'default' | 'modal';
  @Input() hideSignUp: boolean;

  @ContentChildren(AmplifySlotDirective)
  private customComponentQuery: QueryList<AmplifySlotDirective> = null;

  // translated texts
  public signInTitle = translate('Sign In');
  public signUpTitle = translate('Create Account');

  private hasInitialized = false;
  private unsubscribeMachine: () => void;

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
      formFields,
    } = this;

    /**
     * Subscribes to state machine changes and sends INIT event
     * once machine reaches 'setup' state.
     */
    this.unsubscribeMachine = this.authenticator.subscribe(() => {
      const { route } = this.authenticator;
      if (!this.hasInitialized && route === 'setup') {
        this.authenticator.send({
          type: 'INIT',
          data: {
            initialState,
            loginMechanisms,
            services,
            signUpAttributes,
            socialProviders,
            formFields,
          },
        });

        this.hasInitialized = true;
      }
    }).unsubscribe;

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

  ngOnDestroy(): void {
    if (this.unsubscribeMachine) this.unsubscribeMachine();
  }

  /**
   * Class Functions
   */

  // context passed to "authenticated" slot
  public get context() {
    return this.authenticator.slotContext;
  }

  public get route() {
    return this.authenticator.route;
  }

  public onTabChange() {
    const route = this.authenticator.route;
    if (route === 'signIn') {
      this.authenticator.toSignUp();
    } else {
      this.authenticator.toSignIn();
    }
  }

  public hasTabs() {
    const route = this.authenticator.route;
    return route === 'signIn' || route === 'signUp';
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
