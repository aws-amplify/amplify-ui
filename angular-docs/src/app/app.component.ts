import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-docs';
  navList = [
    {
      path: 'basic-authenticator',
      name: 'Basic Authenticator',
    },
    {
      path: 'headless-authenticator',
      name: 'Headless Authenticator',
    },
    {
      path: 'styled-authenticator',
      name: 'Define Custom Style',
    },    {
      path: 'custom-authenticator',
      name: 'Insert Custom Component',
    },
  ];
}
