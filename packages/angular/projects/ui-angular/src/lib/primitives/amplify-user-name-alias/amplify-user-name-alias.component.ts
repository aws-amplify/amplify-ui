import { Component, Input, OnInit } from '@angular/core';
import { StateMachineService } from '../../services/state-machine.service';
import { getAliasInfoFromContext } from '@aws-amplify/ui';

@Component({
  selector: 'amplify-user-name-alias',
  templateUrl: './amplify-user-name-alias.component.html',
})
export class AmplifyUserNameAliasComponent implements OnInit {
  @Input() name: string = 'username';
  @Input() disabled: boolean = false;
  @Input() initialValue: string = '';
  public label: string;
  public type: string;
  public error: string;
  public placeholder: string;

  constructor(private stateMachine: StateMachineService) {}

  ngOnInit(): void {
    const context = this.stateMachine.context;
    const { label, type } = getAliasInfoFromContext(context);

    this.label = label;
    this.type = type;
    this.placeholder = `Enter your ${label.toLowerCase()}`;
  }
}
