import {
  AfterContentInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
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
  setUserAgent,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  private unsubscribeMachine: () => void;
  private clearUserAgent: () => void;

  constructor(
    private authenticator: AuthenticatorService,
    private contextService: CustomComponentsService,
    private changeDetector: ChangeDetectorRef
  ) {}

  // context passed to "authenticated" slot
  public get context(): AuthenticatorService['slotContext'] {
    return this.authenticator.slotContext;
  }

  public get route(): AuthenticatorService['route'] {
    return this.authenticator.route;
  }

  ngOnInit(): void {
    const {
      initialState,
      loginMechanisms,
      services,
      signUpAttributes,
      socialProviders,
      formFields,
    } = this;

    this.clearUserAgent = setUserAgent({
      componentName: 'Authenticator',
      packageName: 'angular',
      version: VERSION,
    });

    const { initializeMachine } = this.authenticator;

    /**
     * Subscribes to state machine changes and sends INIT event
     * once machine reaches 'setup' state.
     */
    this.unsubscribeMachine = this.authenticator.authStateObservable$.subscribe(
      () => {
        const { route } = this.authenticator;

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
        // manually run change detection when machine state changes
        this.changeDetector.detectChanges();
      }
    ).unsubscribe;

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
    this.clearUserAgent();
    if (this.unsubscribeMachine) this.unsubscribeMachine();
  }

  /**
   * Class Functions
   */
  public onTabChange(): void {
    const { route } = this.authenticator;
    if (route === 'signIn') {
      this.authenticator.toSignUp();
    } else {
      this.authenticator.toSignIn();
    }
  }

  public hasTabs(): boolean {
    const { route } = this.authenticator;
    return route === 'signIn' || route === 'signUp';
  }

  public hasRouteComponent(): boolean {
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
  ): Record<string, TemplateRef<unknown>> {
    if (!componentQuery) return {};
    const customComponents: Record<string, TemplateRef<unknown>> = {};
    componentQuery.forEach((component) => {
      customComponents[component.name] = component.template;
    });

    return customComponents;
  }
}
