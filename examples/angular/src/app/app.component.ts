import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';
import { Hub } from 'aws-amplify/utils';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular';

  constructor() {
    // This exists to expose `Amplify` & its categories on `window` for e2e testing
    if (typeof window !== 'undefined') {
      (window as any)['Amplify'] = Amplify;
      (window as any)['Hub'] = Hub;
    }
  }
}
