import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from '../../../../../services/authenticator.service';
import { isEmpty } from 'lodash';
import { getConfiguredAliases } from '@aws-amplify/ui';

@Component({
  selector: 'amplify-sign-up-form-fields',
  templateUrl: './sign-up-form-fields.component.html',
})
export class AmplifySignUpFormFieldsComponent implements OnInit {
  public primaryAlias = '';
  public secondaryAliases: string[] = [];

  constructor(private authenticator: AuthenticatorService) {}

  ngOnInit(): void {
    const context = this.authenticator.context;
    const { primaryAlias, secondaryAliases } = getConfiguredAliases(context);

    /**
     * If the login_mechanisms are configured to use ONLY username, we need
     * to ask for some sort of secondary contact information in order to
     * verify the user for Cognito. Currently matching this to how Vue is
     * set up.
     */
    if (primaryAlias === 'username' && isEmpty(secondaryAliases)) {
      secondaryAliases.push('email', 'phone_number');
    }

    this.primaryAlias = primaryAlias;
    this.secondaryAliases = secondaryAliases;
  }
}
