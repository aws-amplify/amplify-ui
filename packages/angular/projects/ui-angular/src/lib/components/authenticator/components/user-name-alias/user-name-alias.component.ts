import { Component, Input, OnInit } from '@angular/core';
import { AuthenticatorService } from '../../../../services/authenticator.service';
import { getAliasInfoFromContext } from '@aws-amplify/ui';

@Component({
  selector: 'amplify-user-name-alias',
  templateUrl: './user-name-alias.component.html',
})
export class UserNameAliasComponent implements OnInit {
  @Input() name: string = 'username';
  @Input() disabled: boolean = false;
  @Input() initialValue: string = '';
  @Input() required: boolean = true;
  @Input() labelHidden: boolean;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() dialCode: string;
  @Input() dialCodeList: Array<string>;

  public labelValue: string;
  public type: string;
  public error: string;
  public placeholderValue: string;
  public requiredValue: boolean;

  constructor(private authenticator: AuthenticatorService) {}

  ngOnInit(): void {
    const context = this.authenticator.context;
    const { label: lbl, type } = getAliasInfoFromContext(context);

    this.labelValue = this.label ?? lbl;
    this.type = type;
    this.placeholderValue = this.placeholder ?? lbl;
    this.requiredValue = this.required ?? true;
  }
}
