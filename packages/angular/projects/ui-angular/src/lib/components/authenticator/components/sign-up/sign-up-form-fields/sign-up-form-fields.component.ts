import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from '../../../../../services/authenticator.service';
import { FormFields, getFormFields } from '@aws-amplify/ui';

@Component({
  selector: 'amplify-sign-up-form-fields',
  templateUrl: './sign-up-form-fields.component.html',
})
export class SignUpFormFieldsComponent implements OnInit {
  public formFields: FormFields;

  constructor(private authenticator: AuthenticatorService) {}

  ngOnInit(): void {
    this.setFormFields();
  }

  public setFormFields() {
    const _state = this.authenticator.authState;
    this.formFields = getFormFields('signUp', _state);
  }
}
