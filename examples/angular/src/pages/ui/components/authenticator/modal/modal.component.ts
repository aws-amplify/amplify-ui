import { Component } from '@angular/core';
import { Amplify } from '@aws-amplify/core';

import awsExports from './aws-exports';

@Component({
  selector: 'modal',
  templateUrl: 'modal.component.html',
})
export class ModalComponent {
  constructor() {
    Amplify.configure(awsExports);
  }
}
