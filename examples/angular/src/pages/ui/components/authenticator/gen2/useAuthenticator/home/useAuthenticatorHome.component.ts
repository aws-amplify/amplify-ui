import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Amplify } from 'aws-amplify';
import { AuthenticatorService } from '@aws-amplify/ui-angular';

import amplifyOutputs from '../amplify_outputs';

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
    Amplify.configure(amplifyOutputs);
  }

  public handleClick(event: Event) {
    event.preventDefault();
    this.authenticator.signOut();
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
