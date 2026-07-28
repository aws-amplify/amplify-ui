import { Component, inject } from '@angular/core';
import { Amplify } from 'aws-amplify';
import { AuthenticatorService } from '@aws-amplify/ui-angular';

import awsExports from './aws-exports';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'use-authenticator',
  standalone: false,
  templateUrl: 'useAuthenticator.component.html',
})
export class UseAuthenticatorComponent {
  authenticator = inject(AuthenticatorService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor() {
    Amplify.configure(awsExports);
  }

  public navigateHome(event: Event): void {
    event.preventDefault();
    this.router.navigate(['home'], { relativeTo: this.route });
  }
}
