import React from 'react';

import { Alert, Button, Image, TextField } from '../../../primitives';
import {
  AccountSettingsError,
  AccountSettingsImage,
  AccountSettingsSubmitButton,
  AccountSettingsTextField,
} from '../types';

export const ConfirmationCode: AccountSettingsTextField = TextField;

export const SecretKeyQRCode: AccountSettingsImage = Image;

export const CopySecretKey: AccountSettingsSubmitButton = Button;

export const SubmitButton: AccountSettingsSubmitButton = (props) => (
  <Button type="submit" {...props} />
);

export const Error: AccountSettingsError = (props) => {
  return <Alert variation="error" {...props} />;
};
