import {
  Component,
  HostBinding,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { AuthenticatorService } from '../../../../services/authenticator.service';
import { getAliasInfoFromContext, translate } from '@aws-amplify/ui';

@Component({
  selector: 'amplify-sign-in',
  templateUrl: './sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SignInComponent implements OnInit {
  @HostBinding('attr.data-amplify-authenticator-signin') dataAttr = '';
  public label: string; // username label
  public type: string; // username type
  public placeholder: string; // username placeholder

  // translated phrases
  public forgotPasswordText = translate('Forgot your password? ');
  public signInButtonText = translate('Sign in');

  constructor(public authenticator: AuthenticatorService) {}

  ngOnInit(): void {
    const { context } = this.authenticator;
    const { label, type } = getAliasInfoFromContext(context);

    this.type = type;
    this.label = label;
    this.placeholder = label;
  }

  public get context() {
    return this.authenticator.slotContext;
  }

  onInput(event: Event) {
    event.preventDefault();
    const { name, value } = <HTMLInputElement>event.target;
    this.authenticator.updateForm({ name, value });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const json = Object.fromEntries(formData);

    this.authenticator.submitForm(json);
  }
}
