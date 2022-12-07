import React from 'react';

import { Alert, Button, Image, TextField } from '../../../primitives';
import {
  ButtonComponent,
  ErrorMessageComponent,
  ImageComponent,
  SubmitButtonComponent,
  TextFieldComponent,
} from '../types';

export const ConfirmationCode: TextFieldComponent = ({ label, ...rest }) => (
  <TextField {...rest} label={label} />
);

export const SecretKeyQRCode: ImageComponent = Image;

export const CopySecretKey: ButtonComponent = Button;

export const SubmitButton: SubmitButtonComponent = (props) => (
  <Button type="submit" {...props} />
);

export const Error: ErrorMessageComponent = (props) => {
  return <Alert variation="error" {...props} />;
};
