import {
  AfterContentInit,
  ChangeDetectorRef,
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
  authenticatorTextUtil,
  configureComponent,
  defaultAuthHubHandler,
  listenToAuthHub,
  SocialProvider,
} from '@aws-amplify/ui';
import { AmplifySlotDirective } from '../../../../utilities/amplify-slot/amplify-slot.directive';
import { CustomComponentsService } from '../../../../services/custom-components.service';
import { AuthenticatorService } from '../../../../services/authenticator.service';
import { VERSION } from '../../../../../version';

const { getSignInTabText, getSignUpTabText } = authenticatorTextUtil;

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
  public signInTitle = getSignInTabText();
  public signUpTitle = getSignUpTabText();

  private hasInitialized = false;
  private isHandlingHubEvent = false;
  private unsubscribeMachine: () => void;
  private unsubscribeHub: ReturnType<typeof listenToAuthHub>;

  constructor(
    private authenticator: AuthenticatorService,
    private contextService: CustomComponentsService,
    private changeDetector: ChangeDetectorRef
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

    configureComponent({
      packageName: '@aws-amplify/ui-angular',
      version: VERSION,
    });

    const { authService, initializeMachine } = this.authenticator;

    this.unsubscribeHub = listenToAuthHub(
      authService,
      async (data, service) => {
        await defaultAuthHubHandler(data, service);
        /**
         * Hub events aren't properly caught by Angular, because they are
         * synchronous events. Angular tracks async network events and
         * html events, but not synchronous events like hub.
         *
         * On any notable hub events, we run change detection manually.
         */
        this.changeDetector.detectChanges();

        /**
         * Hub events that we handle can lead to multiple state changes:
         * e.g. `authenticated` -> `signOut` -> initialState.
         *
         * We want to ensure change detection runs all the way, until
         * we reach back to the initial state. Setting the below flag
         * to true to until we reach initial state.
         */
        this.isHandlingHubEvent = true;
      }
    );

    /**
     * Subscribes to state machine changes and sends INIT event
     * once machine reaches 'setup' state.
     */
    this.unsubscribeMachine = this.authenticator.subscribe(() => {
      const { route } = this.authenticator;

      if (this.isHandlingHubEvent) {
        this.changeDetector.detectChanges();

        const initialStateWithDefault = initialState ?? 'signIn';

        // We can stop manual change detection if we're back to the initial state
        if (route === initialStateWithDefault) {
          this.isHandlingHubEvent = false;
        }
      }

      if (!this.hasInitialized && route === 'setup') {
        initializeMachine({
          initialState,
          loginMechanisms,
          services,
          signUpAttributes,
          socialProviders,
          formFields,
        });

        this.hasInitialized = true;
      }
    }).unsubscribe;

    /**
     * handling translations after content init, because authenticator and its
     * translations might be initialized before the main app's `ngOnInit` is run.
     */
    this.signInTitle = getSignInTabText();
    this.signUpTitle = getSignUpTabText();
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
    if (this.unsubscribeHub) this.unsubscribeHub();
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
    const { route } = this.authenticator;
    return route === 'signIn' || route === 'signUp';
  }

  public hasRouteComponent() {
    const { route } = this.authenticator;

    switch (route) {
      case 'authenticated':
      case 'idle':
      case 'setup':
      case 'signOut':
      case 'transition':
        return false;
      default:
        return true;
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
