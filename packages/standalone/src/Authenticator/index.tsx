import { Authenticator as AuthenticatorComponent } from '@aws-amplify/ui-react';
import * as React from 'react';
import ReactDOM from 'react-dom';

export class Authenticator {
  constructor(container: HTMLElement) {
    ReactDOM.render(
      <AuthenticatorComponent>{() => <h1>Howdy</h1>}</AuthenticatorComponent>,
      container
    );
  }
}
