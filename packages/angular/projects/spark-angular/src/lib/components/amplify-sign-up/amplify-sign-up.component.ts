import {
  AfterContentInit,
  Component,
  HostBinding,
  Input,
  TemplateRef,
} from '@angular/core';
import { ComponentsProviderService } from '../../services/components-provider.service';
import { StateMachineService } from '../../services/state-machine.service';

@Component({
  selector: 'amplify-sign-up',
  templateUrl: './amplify-sign-up.component.html',
})
export class AmplifySignUpComponent implements AfterContentInit {
  @Input() headerText = 'Create a new account';
  @HostBinding('attr.data-spark-sign-up') dataAttr = '';
  public customComponents: Record<string, TemplateRef<any>>;
  public context = {
    $implicit: {
      signUp: () => {
        console.log('to be implemented');
      },
    },
  };
  constructor(
    private stateMachine: StateMachineService,
    private componentsProvider: ComponentsProviderService
  ) {}

  ngAfterContentInit(): void {
    this.customComponents = this.componentsProvider.customComponents;
  }

  signUp(): void {
    this.stateMachine.authState = 'signIn';
  }

  toSignIn(): void {
    this.stateMachine.authState = 'signIn';
  }
}
