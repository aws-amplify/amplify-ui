import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';
import { AuthenticatorService } from '@aws-amplify/ui-angular';

import { ActivatedRoute, Router } from '@angular/router';

const amplifyOutputs = (
  await import(`@environments/auth/auth-with-email/${process.env.PATH}`)
).default;

@Component({
  selector: 'use-authenticator',
  templateUrl: 'useAuthenticator.component.html',
})
export class UseAuthenticatorComponent {
  constructor(
    public authenticator: AuthenticatorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    Amplify.configure(amplifyOutputs);
  }

  public navigateHome(event: Event) {
    event.preventDefault();
    this.router.navigate(['home'], { relativeTo: this.route });
  }
}
