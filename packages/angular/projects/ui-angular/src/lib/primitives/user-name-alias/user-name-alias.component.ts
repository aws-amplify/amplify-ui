import { Component, Input, OnInit } from '@angular/core';
import { AuthenticatorService } from '../../services/authenticator.service';
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
  public label: string;
  public type: string;
  public error: string;
  public placeholder: string;

  constructor(private authenticator: AuthenticatorService) {}

  ngOnInit(): void {
    const context = this.authenticator.context;
    const { label, type } = getAliasInfoFromContext(context);

    this.label = label;
    this.type = type;
    this.placeholder = label;
  }
}
