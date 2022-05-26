import { Component, OnInit } from '@angular/core';
import { Amplify, Auth } from 'aws-amplify';
import { AuthenticatorService } from '@aws-amplify/ui-angular';

import awsExports from './aws-exports';
import { ActivatedRoute, Router } from '@angular/router';

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
    Amplify.configure(awsExports);
  }

  public navigateHome(event: Event) {
    event.preventDefault();
    this.router.navigate(['home'], { relativeTo: this.route });
  }
}
