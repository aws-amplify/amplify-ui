import { Auth, Logger } from 'aws-amplify';
import {
  AfterContentInit,
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ComponentsProviderService, StateMachineService } from '../../services';
import {
  AuthAttribute,
  InputErrors,
  mapInputErrors,
  noWhitespacesAfterTrim,
  SignInValidators,
} from '../../common';
import { Event, State, Subscription } from 'xstate';
const logger = new Logger('SignIn');
@Component({
  selector: 'amplify-sign-in',
  templateUrl: './amplify-sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AmplifySignInComponent
  implements AfterContentInit, OnInit, OnDestroy {
  @HostBinding('attr.data-ui-sign-in') dataAttr = '';
  @Input() public headerText = 'Sign in to your account';
  private authSubscription: Subscription;
  public loading = false;
  public customComponents: Record<string, TemplateRef<any>> = {};
  public inputErrors: InputErrors; // errors specific to each input
  public formError: string; // errors specific to the form as a whole or api error
  public context = {
    $implicit: {},
  };
  public formGroup = this.fb.group(
    {
      username: ['', [Validators.required, noWhitespacesAfterTrim]],
      password: ['', [Validators.required]],
    },
    { updateOn: 'submit' }
  );

  constructor(
    private fb: FormBuilder,
    private stateMachine: StateMachineService,
    private componentsProvider: ComponentsProviderService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.stateMachine.authService.subscribe((state) =>
      this.onStateUpdate(state)
    );
  }

  ngOnDestroy(): void {
    logger.log('sign in destroyed, unsubscribing from state machine...');
    this.authSubscription.unsubscribe();
  }

  ngAfterContentInit(): void {
    this.customComponents = this.componentsProvider.customComponents;

    // attach custom validators
    const props = this.componentsProvider.props.signIn;
    const customValidators = props?.signInValidators;
    this.attachCustomValidators(customValidators);
  }

  onStateUpdate(state: State<any>): void {
    if (state.event.type.includes('error')) {
      this.formError = (state.event as any).data.message;
      this.loading = false;
    }
  }

  toSignUp(): void {
    this.stateMachine.authService.send('SIGN_UP');
  }

  getFormControl(name: AuthAttribute): AbstractControl {
    return this.formGroup.get(name);
  }

  send(event: Event<any>): void {
    this.stateMachine.authService.send(event);
  }

  async onSubmit($event): Promise<void> {
    // get form data
    const formData = new FormData($event.target);
    const formValues = Object.fromEntries(formData.entries());

    logger.log('sign up form submitted with', formValues);

    // trim input
    const usernameControl = this.formGroup.get('username');
    this.formGroup.get('username').setValue(usernameControl.value.trim());

    // set validation errors, which will be rendered below each respective input
    this.inputErrors = mapInputErrors(this.formGroup.controls);

    // return if form is still invalid
    if (this.formGroup.status !== 'VALID') return;
    this.loading = true; // disable inputs

    this.send({
      type: 'SUBMIT',
      data: formValues,
    });
  }

  private attachCustomValidators(customValidators: SignInValidators): void {
    if (!customValidators) return;
    for (const [inputName, validators] of Object.entries(customValidators)) {
      const inputControl = this.formGroup.get(inputName);
      if (!inputControl)
        throw new Error(`There is no FormControl for ${inputName} field.`);
      inputControl.setValidators([inputControl.validator, ...validators]);
    }
  }
}
