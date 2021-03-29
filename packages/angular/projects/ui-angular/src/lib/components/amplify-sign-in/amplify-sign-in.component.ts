import { Auth } from 'aws-amplify';
import {
  AfterContentInit,
  Component,
  HostBinding,
  Input,
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

@Component({
  selector: 'amplify-sign-in',
  templateUrl: './amplify-sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AmplifySignInComponent implements AfterContentInit {
  @HostBinding('attr.data-ui-sign-in') dataAttr = '';
  @Input() public headerText = 'Sign in to your account';
  public loading = false;
  public customComponents: Record<string, TemplateRef<any>> = {};
  public inputErrors: InputErrors;
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

  ngAfterContentInit(): void {
    this.customComponents = this.componentsProvider.customComponents;

    // attach custom validators
    const props = this.componentsProvider.props.signIn;
    const customValidators = props?.signInValidators;
    this.attachCustomValidators(customValidators);
  }

  toSignUp(): void {
    this.stateMachine.authState = 'signUp';
  }

  getFormControl(name: AuthAttribute): AbstractControl {
    return this.formGroup.get(name);
  }

  async onSubmit(): Promise<void> {
    console.log(this.formGroup);
    const usernameControl = this.formGroup.get('username');
    const passwordControl = this.formGroup.get('password');
    console.log(usernameControl, passwordControl);
    // trim password
    usernameControl.setValue(usernameControl.value.trim());

    this.inputErrors = mapInputErrors(this.formGroup.controls);

    if (this.formGroup.status !== 'VALID') return;
    this.loading = true;

    try {
      await Auth.signIn(usernameControl.value, passwordControl.value);
      this.stateMachine.authState = 'signedIn';
    } catch (err) {
      console.error(err);
    } finally {
      this.loading = false;
    }
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
