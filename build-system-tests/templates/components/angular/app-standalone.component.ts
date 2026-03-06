import { Component } from '@angular/core';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

import { Amplify } from 'aws-amplify';
import aws_exports from '../../../../environments/auth-with-email/src/aws-exports.js';
Amplify.configure(aws_exports);
@Component({
  standalone: true,
  imports: [AmplifyAuthenticatorModule],
  selector: 'app-root',
  template: `
    <amplify-authenticator>
      <ng-template
        amplifySlot="authenticated"
        let-user="user"
        let-signOut="signOut"
      >
        <h1>Welcome {{ user.username }}!</h1>
        <button (click)="signOut()">Sign Out</button>
      </ng-template>
    </amplify-authenticator>
  `,
  styles: [],
})
export class AppComponent {
  title = 'ng-app-ts';
}
