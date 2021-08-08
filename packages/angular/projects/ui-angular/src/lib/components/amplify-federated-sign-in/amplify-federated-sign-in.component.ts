import {
  AfterContentInit,
  Component,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { StateMachineService, AuthPropService } from '../../services';
import { FederatedIdentityProviders } from '@aws-amplify/ui-core';

@Component({
  selector: 'amplify-federated-sign-in',
  templateUrl: './amplify-federated-sign-in.component.html',
})
export class AmplifyFederatedSignInComponent
  implements OnInit, AfterContentInit
{
  public FederatedProviders = FederatedIdentityProviders;
  public customComponents: Record<string, TemplateRef<any>> = {};
  public includeFacebook: boolean = false;
  public includeGoogle: boolean = false;
  public includeAmazon: boolean = false;
  public shouldShowFederatedSignIn = false;

  constructor(
    private stateMachine: StateMachineService,
    private contextService: AuthPropService
  ) {}

  ngOnInit(): void {
    const loginMechanisms = this.stateMachine.context?.config?.login_mechanisms;

    this.includeFacebook = loginMechanisms?.includes('facebook');
    this.includeGoogle = loginMechanisms?.includes('google');
    this.includeAmazon = loginMechanisms?.includes('amazon');

    this.shouldShowFederatedSignIn =
      this.includeFacebook || this.includeGoogle || this.includeAmazon;
  }

  ngAfterContentInit(): void {
    this.customComponents = this.contextService.customComponents;
  }
}
