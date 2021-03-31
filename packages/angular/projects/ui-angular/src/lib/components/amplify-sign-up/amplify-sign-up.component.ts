import { Auth } from 'aws-amplify';
import {
  AfterContentInit,
  Component,
  HostBinding,
  Input,
  TemplateRef,
} from '@angular/core';
import { FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import {
  InputErrors,
  mapInputErrors,
  noWhitespacesAfterTrim,
} from '../../common';
import { ComponentsProviderService, StateMachineService } from '../../services';

@Component({
  selector: 'amplify-sign-up',
  templateUrl: './amplify-sign-up.component.html',
})
export class AmplifySignUpComponent implements AfterContentInit {
  @Input() headerText = 'Create a new account';
  @HostBinding('attr.data-ui-sign-up') dataAttr = '';
  public customComponents: Record<string, TemplateRef<any>>;
  public loading = true;
  public inputErrors: InputErrors;
  public context = {
    $implicit: {
      signUp: () => {
        console.log('to be implemented');
      },
    },
  };
  public formGroup = this.fb.group({
    username: ['', [Validators.required, noWhitespacesAfterTrim]],
    password: ['', [Validators.required]],
    email: ['', [Validators.required, noWhitespacesAfterTrim]],
    phone_number: ['', [Validators.required, noWhitespacesAfterTrim]],
  });

  constructor(
    private fb: FormBuilder,
    private stateMachine: StateMachineService,
    private componentsProvider: ComponentsProviderService
  ) {}

  ngAfterContentInit(): void {
    this.customComponents = this.componentsProvider.customComponents;
  }

  async onSubmit(): Promise<void> {
    const values = this.formGroup.getRawValue();
    this.inputErrors = mapInputErrors(this.formGroup.controls);

    if (this.formGroup.status !== 'VALID') return;
    this.loading = true;

    try {
      await Auth.signUp({
        username: values.username,
        password: values.password,
        attributes: {
          email: values.email,
          phone_number: values.phone_number,
        },
      });
      this.stateMachine.authState = 'signIn';
    } catch (err) {
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  toSignIn(): void {
    this.stateMachine.authService.send('SIGN_IN');
  }
}
