import { Component, Input, OnInit } from '@angular/core';
import { AuthenticatorService } from '../../../../services/authenticator.service';
import {
  ActorContextWithForms,
  getActorContext,
  getAliasInfoFromContext,
} from '@aws-amplify/ui';

@Component({
  selector: 'amplify-user-name-alias',
  templateUrl: './user-name-alias.component.html',
})
export class UserNameAliasComponent implements OnInit {
  @Input() name: string = 'username';
  @Input() disabled: boolean = false;
  @Input() initialValue: string = '';
  @Input() required: boolean = true;
  public label: string;
  public type: string;
  public error: string;
  public placeholder: string;
  public defaultCountryCode?: string;

  private fullPhoneNumber: {
    country_code: string;
    phone_number?: string;
    username?: string;
  };

  constructor(private authenticator: AuthenticatorService) {}

  ngOnInit(): void {
    const context = this.authenticator.context;
    const { label, type } = getAliasInfoFromContext(context);

    this.label = label;
    this.type = type;
    this.placeholder = label;

    if (this.isPhoneField()) {
      const state = this.authenticator.authState;
      const { country_code }: ActorContextWithForms = getActorContext(state);
      this.defaultCountryCode = country_code;
      this.fullPhoneNumber = { country_code };
    }
  }

  isPhoneField(): boolean {
    return this.type === 'tel';
  }

  /**
   * When the field being rendered is for a phone number, this handler is used to prevent change event propagation in
   * order to manually update the state machine with a country code + phone number.
   */
  handlePhoneNumberChange(event: InputEvent) {
    event.stopPropagation();

    const { name, value } = <HTMLInputElement>event.target;
    this.fullPhoneNumber = { ...this.fullPhoneNumber, [name]: value };

    this.authenticator.updateForm({
      name: this.name,
      value: this.fullPhoneNumber.country_code + this.fullPhoneNumber[name],
    });
  }
}
