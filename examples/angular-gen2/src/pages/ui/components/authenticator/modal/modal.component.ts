import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';

import amplifyOutputs from './amplify_outputs';

@Component({
  selector: 'modal',
  templateUrl: 'modal.component.html',
})
export class ModalComponent {
  constructor() {
    Amplify.configure(amplifyOutputs);
  }
}
