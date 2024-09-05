import { Component } from '@angular/core';

@Component({
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
