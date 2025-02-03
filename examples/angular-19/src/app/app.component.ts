import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Amplify } from 'aws-amplify';
import { Hub } from 'aws-amplify/utils';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-19';

  constructor() {
    // This exists to expose `Amplify` & its categories on `window` for e2e testing
    if (typeof window !== 'undefined') {
      (window as any)['Amplify'] = Amplify;
      (window as any)['Hub'] = Hub;
    }
  }
}
