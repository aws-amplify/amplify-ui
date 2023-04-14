import { Component } from '@angular/core';

@Component({
  selector: 'lib-my-amplify-ui-lib',
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
export class MyAmplifyUiLibComponent {}
