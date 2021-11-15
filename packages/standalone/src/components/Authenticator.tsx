import { Authenticator as AuthenticatorComponent } from '@aws-amplify/ui-react';

import { BaseImperativeHandle, BaseImperativeHandleProps } from '../helpers';

export class Authenticator extends BaseImperativeHandle {
  constructor(props: BaseImperativeHandleProps) {
    super(props);

    this._render(
      <AuthenticatorComponent>{() => <h1>Howdy</h1>}</AuthenticatorComponent>
    );
  }
}
