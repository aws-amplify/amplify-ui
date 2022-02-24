import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from '../../../../../services/authenticator.service';
import {
  authInputAttributes,
  formField,
  formFieldTypes,
  getActorState,
  LoginMechanism,
  SignUpAttribute,
} from '@aws-amplify/ui';

@Component({
  selector: 'amplify-sign-up-form-fields',
  templateUrl: './sign-up-form-fields.component.html',
})
export class SignUpFormFieldsComponent implements OnInit {
  public primaryAlias = '';
  public secondaryAliases: string[] = [];
  public fieldNames: Array<LoginMechanism | SignUpAttribute>;
  public loginMechanism: LoginMechanism;

  public userOR: formFieldTypes;
  public formOverrides: formField;

  constructor(private authenticator: AuthenticatorService) {}

  ngOnInit(): void {
    const context = this.authenticator.context;

    const { loginMechanisms, signUpAttributes } = context.config;

    this.fieldNames = Array.from(
      new Set([...loginMechanisms, ...signUpAttributes])
    );

    this.fieldNames = this.fieldNames.filter((fieldName) => {
      const hasDefaultField = !!authInputAttributes[fieldName];
      if (!hasDefaultField) {
        console.debug(
          `Authenticator does not have a default implementation for ${fieldName}. Customize Authenticator.SignUp.FormFields to add your own.`
        );
      }
      return hasDefaultField;
    });

    // Only 1 is supported, so `['email', 'phone_number']` will only show `email`
    this.loginMechanism = this.fieldNames.shift() as LoginMechanism;
    this.setFormFields();
  }

  public setFormFields() {
    const _state = this.authenticator.authState;
    this.formOverrides = getActorState(_state).context?.formFields?.signUp;
    this.userOR = this.formOverrides?.[this.loginMechanism];
  }

  public grabField(name: string, field: string, defaultV) {
    return this.formOverrides?.[name]?.[field] ?? defaultV;
  }
}
