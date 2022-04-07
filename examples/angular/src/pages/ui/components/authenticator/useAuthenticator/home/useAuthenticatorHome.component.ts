import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Amplify } from 'aws-amplify';
import { AuthenticatorService } from '@aws-amplify/ui-angular';

import awsExports from '../aws-exports';

@Component({
  selector: 'use-authenticator',
  templateUrl: 'useAuthenticatorHome.component.html',
})
export class UseAuthenticatorHomeComponent {
  constructor(
    public authenticator: AuthenticatorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    Amplify.configure(awsExports);
  }

  public handleClick(event: Event) {
    event.preventDefault();
    this.authenticator.signOut();
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
