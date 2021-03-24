import {
  AfterContentInit,
  Component,
  HostBinding,
  Input,
  Optional,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { ComponentsProviderService } from '../../services/components-provider.service';
import { StateMachineService } from '../../services/state-machine.service';
import { AmplifyAuthenticatorComponent } from '../amplify-authenticator/amplify-authenticator.component';

@Component({
  selector: 'amplify-sign-in',
  templateUrl: './amplify-sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AmplifySignInComponent implements AfterContentInit {
  @HostBinding('attr.data-spark-sign-in') dataAttr = '';
  @Input() public headerText = 'Sign in to your account';
  public customComponents: Record<string, TemplateRef<any>> = {};
  public context = {
    $implicit: { signIn: () => this.signIn() },
  };

  constructor(
    private stateMachine: StateMachineService,
    private componentsProvider: ComponentsProviderService
  ) {}

  ngAfterContentInit(): void {
    this.customComponents = this.componentsProvider.customComponents;
  }

  signIn(): void {
    this.stateMachine.authState = 'signedIn';
  }

  toSignUp(): void {
    this.stateMachine.authState = 'signUp';
  }
}
