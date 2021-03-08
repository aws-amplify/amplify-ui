import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  AfterViewInit,
} from '@angular/core';
import { SparkContextProviderComponent } from 'src/app/spark-context-provider/spark-context-provider.component';
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
  @Input() headerText = 'Sign in to your account';
  @Output() signInEvent = new EventEmitter<string>();

  signIn(): void {
    console.log('signing in...');
    // this.signInEvent.emit('signedIn');
    this.authenticator.updateAuthState('signedIn');
  }
}
