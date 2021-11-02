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
  getActorState,
  translate,
} from '@aws-amplify/ui';
import { AmplifySlotDirective } from '../../../../utilities/amplify-slot/amplify-slot.directive';
import { CustomComponentsService } from '../../../../services/custom-components.service';
import { AuthenticatorService } from '../../../../services/state-machine.service';

@Component({
  selector: 'amplify-authenticator',
  templateUrl: './amplify-authenticator.component.html',
  providers: [CustomComponentsService], // make sure custom components are scoped to this authenticator only
  encapsulation: ViewEncapsulation.None,
})
export class AmplifyAuthenticatorComponent implements OnInit, AfterContentInit {
  @Input() initialState: AuthenticatorMachineOptions['initialState'];
  @Input() loginMechanisms: AuthenticatorMachineOptions['loginMechanisms'];
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
    const { initialState, loginMechanisms } = this;
    this.authenticator.startMachine({ initialState, loginMechanisms });

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
    const { signOut } = this.authenticator.services;
    const user = this.authenticator.user;
    return { signOut, user } as const;
  }

  public get actorState() {
    return getActorState(this.authenticator.authState);
  }

  public get authenticatorState() {
    return this.authenticator.authState;
  }

  public get variationModal() {
    return this.variation === 'modal';
  }

  public onTabChange() {
    const currentState = this.authenticator.authState.value;
    if (currentState === 'signIn') {
      this.authenticator.send('SIGN_UP');
    } else {
      this.authenticator.send('SIGN_IN');
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
