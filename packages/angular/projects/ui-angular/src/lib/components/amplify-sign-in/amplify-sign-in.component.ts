import { Logger } from 'aws-amplify';
import {
  AfterContentInit,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { ComponentsProviderService, StateMachineService } from '../../services';
import { AuthFormData, FormError } from '../../common';
import { Event, Subscription } from 'xstate';
import { AuthMachineState } from '@aws-amplify/ui-core';

const logger = new Logger('SignIn');

@Component({
  selector: 'amplify-sign-in',
  templateUrl: './amplify-sign-in.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AmplifySignInComponent
  implements AfterContentInit, OnInit, OnDestroy {
  @HostBinding('attr.data-ui-sign-in') dataAttr = '';
  @Input() public headerText = 'Sign in to your account';
  public loading = false;
  public customComponents: Record<string, TemplateRef<any>> = {};
  public formError: FormError = {};
  private authSubscription: Subscription;
  public context = {
    $implicit: {}
  };

  constructor(
    private stateMachine: StateMachineService,
    private componentsProvider: ComponentsProviderService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.stateMachine.authService.subscribe(state =>
      this.onStateUpdate(state)
    );
  }

  ngAfterContentInit(): void {
    this.customComponents = this.componentsProvider.customComponents;

    // attach custom validators
    const props = this.componentsProvider.props.signIn;
    const customValidators = props?.signInValidators;
  }

  ngOnDestroy(): void {
    logger.log('sign in destroyed, unsubscribing from state machine...');
    this.authSubscription.unsubscribe();
  }

  onStateUpdate(state: AuthMachineState): void {
    if (state.event.type.includes('error.platform.signIn')) {
      if (!this.formError.crossField) this.formError.crossField = [];
      this.formError.crossField.push(state.event.data.message);

      this.loading = false;
    }
  }

  validateInputs(formData: AuthFormData): FormError {
    const formError: FormError = {};
    for (const [fieldName, fieldValue] of Object.entries(formData)) {
      console.log(fieldName, fieldValue);
    }
    return formError;
  }

  toSignUp(): void {
    this.stateMachine.authService.send('SIGN_UP');
  }

  send(event: Event<any>): void {
    this.stateMachine.authService.send(event);
  }

  async onSubmit($event): Promise<void> {
    this.formError = {};

    // get form data
    const formData = new FormData($event.target);
    const formValues = Object.fromEntries(formData.entries()) as AuthFormData;

    logger.log('Sign in form submitted with', formValues);

    // trim input
    if (formValues.username) {
      formValues.username = formValues.username;
      // TODO: Refelct the trimmed string in the form
    }

    // validate inputs
    this.validateInputs(formValues);

    // return if form is invalid
    console.log(this.formError);
    if (Object.keys(this.formError).length > 0) return;

    this.loading = true; // disable inputs

    this.send({
      type: 'SUBMIT',
      data: formValues
    });
  }
}
