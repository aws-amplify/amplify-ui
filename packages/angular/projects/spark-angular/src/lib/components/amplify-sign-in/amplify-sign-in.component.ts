import {
  Component,
  Output,
  EventEmitter,
  Input,
  Optional,
  ContentChild,
  TemplateRef,
  ElementRef,
} from '@angular/core';
import { SparkContextProviderComponent } from '../../spark-context-provider/spark-context-provider.component';
import { AmplifyAuthenticatorComponent } from '../amplify-authenticator/amplify-authenticator.component';

@Component({
  selector: 'amplify-sign-in',
  templateUrl: './amplify-sign-in.component.html',
})
export class AmplifySignInComponent {
  AuthenticatorStyle: any = this.provider?.getComputedStyle.Authenticator;

  constructor(
    private authenticator: AmplifyAuthenticatorComponent,
    @Optional() private provider: SparkContextProviderComponent
  ) {}
  @ContentChild('signInButton') signedInContent: ElementRef<any>;
  @Input() headerText = 'Sign in to your account';
  @Output() signInEvent = new EventEmitter<string>();

  signIn(): void {
    console.log(this.signedInContent);
    this.signInEvent.emit('signedIn');
    this.authenticator.updateAuthState('signedIn');
  }
}
