import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from '../../../../../services/authenticator.service';
import {
  authInputAttributes,
  getActorContext,
  SignInContext,
} from '@aws-amplify/ui';

@Component({
  selector: 'amplify-force-new-form-fields',
  templateUrl: './force-new-form-fields.component.html',
})
export class ForceNewFormFieldsComponent implements OnInit {
  public fieldNames: string[];

  constructor(private authenticator: AuthenticatorService) {}

  ngOnInit(): void {
    const state = this.authenticator.authState;
    const actorContext = getActorContext(state) as SignInContext;
    const { requiredAttributes } = actorContext;

    this.fieldNames = requiredAttributes.filter((fieldName) => {
      const hasDefaultField = !!authInputAttributes[fieldName];
      if (!hasDefaultField) {
        console.debug(
          `Authenticator does not have a default implementation for ${fieldName}. Customize Authenticator.SignUp.FormFields to add your own.`
        );
      }
      return hasDefaultField;
    });
  }
}
