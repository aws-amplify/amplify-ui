import {
  AfterContentInit,
  Component,
  HostBinding,
  Input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ComponentsProviderService, StateMachineService } from '../../services';
import { Auth } from 'aws-amplify';
import { noWhitespacesAfterTrim, SignInValidators } from '../../common';

@Component({
  selector: 'amplify-sign-in',
  templateUrl: './amplify-sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AmplifySignInComponent implements AfterContentInit {
  @HostBinding('attr.data-spark-sign-in') dataAttr = '';
  @Input() public headerText = 'Sign in to your account';
  public loading = false;
  public customComponents: Record<string, TemplateRef<any>> = {};
  public context = {
    $implicit: {},
  };
  public signInForm = this.fb.group({
    username: ['', [Validators.required, noWhitespacesAfterTrim]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private stateMachine: StateMachineService,
    private componentsProvider: ComponentsProviderService
  ) {}

  ngAfterContentInit(): void {
    this.customComponents = this.componentsProvider.customComponents;
    const props = this.componentsProvider.props.signIn;
    const customValidators = props?.signInValidators;
    this.attachCustomValidators(customValidators);
  }

  toSignUp(): void {
    this.stateMachine.authState = 'signUp';
  }

  async onSubmit(): Promise<void> {
    const usernameControl = this.signInForm.get('username');
    const passwordControl = this.signInForm.get('password');
    // trim password
    usernameControl.setValue(usernameControl.value.trim());

    if (this.signInForm.status !== 'VALID') return;
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

  private attachCustomValidators(customValidators: SignInValidators) {
    for (let [inputName, validators] of Object.entries(customValidators)) {
      const inputControl = this.signInForm.get(inputName);
      inputControl.setValidators([inputControl.validator, ...validators]);
      console.log(inputControl.validator);
    }
  }
}
