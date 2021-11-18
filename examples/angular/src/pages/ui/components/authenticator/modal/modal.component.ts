import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';

import awsExports from '@environments/auth-with-username-no-attributes/src/aws-exports';

@Component({
  selector: 'modal',
  templateUrl: 'modal.component.html',
})
export class ModalComponent {
  constructor() {
    Amplify.configure(awsExports);
  }
}
