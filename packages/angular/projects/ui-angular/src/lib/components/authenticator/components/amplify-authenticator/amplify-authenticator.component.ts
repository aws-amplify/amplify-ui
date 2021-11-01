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
  translations,
} from '@aws-amplify/ui';
import { I18n } from 'aws-amplify';
import { AmplifySlotDirective } from '../../../../utilities/amplify-slot/amplify-slot.directive';
import { CustomComponentsService } from '../../../../services/custom-components.service';
import { StateMachineService } from '../../../../services/state-machine.service';

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
    private stateMachine: StateMachineService,
    private contextService: CustomComponentsService
  ) {}

  ngOnInit(): void {
    I18n.putVocabularies(translations);

    const { initialState, loginMechanisms } = this;
    this.stateMachine.startMachine({ initialState, loginMechanisms });

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
    const { signOut } = this.stateMachine.services;
    const user = this.stateMachine.user;
    return { signOut, user } as const;
  }

  public get actorState() {
    return getActorState(this.stateMachine.authState);
  }

  public get authenticatorState() {
    return this.stateMachine.authState;
  }

  public get variationModal() {
    return this.variation === 'modal';
  }

  public onTabChange() {
    const currentState = this.stateMachine.authState.value;
    if (currentState === 'signIn') {
      this.stateMachine.send('SIGN_UP');
    } else {
      this.stateMachine.send('SIGN_IN');
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
