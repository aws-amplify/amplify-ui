import React from 'react';

import { Alert, Button, Image, TextField } from '../../../primitives';
import {
  ComponentError,
  AccountSettingsImage,
  ComponentSubmitButton,
  AccountSettingsTextField,
} from '../types';

export const ConfirmationCode: AccountSettingsTextField = TextField;

export const SecretKeyQRCode: AccountSettingsImage = Image;

export const CopySecretKey: ComponentSubmitButton = Button;

export const SubmitButton: ComponentSubmitButton = (props) => (
  <Button type="submit" {...props} />
);

export const Error: ComponentError = (props) => {
  return <Alert variation="error" {...props} />;
};
