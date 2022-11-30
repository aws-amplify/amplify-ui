import React from 'react';

import { Alert, Button, Image, TextField } from '../../../primitives';
import {
  ErrorComponent,
  AccountSettingsImage,
  SubmitButtonComponent,
  AccountSettingsTextField,
} from '../types';

export const ConfirmationCode: AccountSettingsTextField = TextField;

export const SecretKeyQRCode: AccountSettingsImage = Image;

export const CopySecretKey: SubmitButtonComponent = Button;

export const SubmitButton: SubmitButtonComponent = (props) => (
  <Button type="submit" {...props} />
);

export const Error: ErrorComponent = (props) => {
  return <Alert variation="error" {...props} />;
};
