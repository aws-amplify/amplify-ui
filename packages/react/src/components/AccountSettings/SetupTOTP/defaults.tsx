import React from 'react';

import { Alert, Button, Image, TextField } from '../../../primitives';
import {
  ButtonComponent,
  ErrorMessageComponent,
  ImageComponent,
  SubmitButtonComponent,
  TextFieldComponent,
} from '../types';

export const ConfirmationCode: TextFieldComponent = (props) => (
  <TextField {...props} />
);

export const QRCodeImage: ImageComponent = Image;

export const CopyButton: ButtonComponent = Button;

export const SubmitButton: SubmitButtonComponent = (props) => (
  <Button type="submit" {...props} />
);

export const ErrorMessage: ErrorMessageComponent = (props) => {
  return <Alert variation="error" {...props} />;
};
