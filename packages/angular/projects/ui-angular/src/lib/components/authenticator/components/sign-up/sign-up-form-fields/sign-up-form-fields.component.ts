import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from '../../../../../services/authenticator.service';
import {
  authInputAttributes,
  formField,
  formFieldTypes,
  getActorState,
  LoginMechanism,
  SignUpAttribute,
  CommonFields,
  setFormOrder,
  LoginMechanismArray,
} from '@aws-amplify/ui';

@Component({
  selector: 'amplify-sign-up-form-fields',
  templateUrl: './sign-up-form-fields.component.html',
})
export class SignUpFormFieldsComponent implements OnInit {
  public primaryAlias = '';
  public secondaryAliases: string[] = [];
  public fieldNames: Array<LoginMechanism | SignUpAttribute>;
  public fieldNamesCombined: Array<SignUpAttribute | CommonFields>;
  public loginMechanism: LoginMechanism;
  public order: (string | number)[];

  public userOverrides: formFieldTypes;
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

    const common = [
      this.loginMechanism,
      'password',
      'confirm_password',
    ] as CommonFields[];
    this.fieldNamesCombined = [...common, ...this.fieldNames];
    this.setFormFields();
  }

  public setFormFields() {
    const _state = this.authenticator.authState;
    this.formOverrides = getActorState(_state).context?.formFields?.signUp;
    this.userOverrides = this.formOverrides?.[this.loginMechanism];
    this.order = setFormOrder(this.formOverrides, this.fieldNamesCombined);
  }

  public grabField(name: string, field: string, defaultV) {
    return this.formOverrides?.[name]?.[field] ?? defaultV;
  }
}
