import {
  Component,
  HostBinding,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  getActorState,
  getFormDataFromEvent,
  SignInState,
  translate,
  authenticatorTextUtil,
} from '@aws-amplify/ui';
import { AuthenticatorService } from '../../../../services/authenticator.service';
import { getAttributeMap } from '../../../../common';
import { nanoid } from 'nanoid';

const { getSkipText, getVerifyText, getAccountRecoveryInfoText } =
  authenticatorTextUtil;
@Component({
  selector: 'amplify-verify-user',
  templateUrl: './verify-user.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class VerifyUserComponent implements OnInit {
  @HostBinding('attr.data-amplify-authenticator-verifyuser') dataAttr = '';
  @Input() public headerText = getAccountRecoveryInfoText();

  public unverifiedContactMethods = {};
  public labelId = nanoid(12);

  // translated texts
  public skipText = getSkipText();
  public verifyText = getVerifyText();

  constructor(public authenticator: AuthenticatorService) {}

  ngOnInit(): void {
    const actorState = getActorState(
      this.authenticator.authState
    ) as SignInState;
    this.unverifiedContactMethods = actorState.context.unverifiedContactMethods;
  }

  public get context() {
    return this.authenticator.slotContext;
  }

  getLabelForAttr(authAttr: string): string {
    const attributeMap = getAttributeMap();
    const label = attributeMap[authAttr]?.label;
    return translate<string>(label);
  }

  onInput(event: Event) {
    event.preventDefault();
    const { name, value } = <HTMLInputElement>event.target;
    this.authenticator.updateForm({ name, value });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.authenticator.submitForm(getFormDataFromEvent(event));
  }
}
