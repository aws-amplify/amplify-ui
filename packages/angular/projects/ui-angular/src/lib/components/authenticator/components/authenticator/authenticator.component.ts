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
  listenToAuthHub,
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

    this.unsubscribeHub = listenToAuthHub((event) => {
      /**
       * Hub events aren't properly caught by Angular, because they are
       * synchronous events. Angular tracks async network events and
       * html events, but not synchronous events like hub.
       *
       * On any notable hub events, we run change detection manually.
       */
      const state = this.authenticator.authService.send(event);
      this.changeDetector.detectChanges();

      /**
       * All Hub events that we handle lead to multiple state changes:
       * e.g. `authenticated` -> `signOut` -> initialState.
       *
       * We want to ensure change detection runs all the way, until
       * we reach back to the initial state. Setting the below flag
       * to true to track the sequence of manual change detection.
       */
      this.isHandlingHubEvent = true;
      return state;
    });

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
