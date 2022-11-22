import React from 'react';
import { Alert } from '../../../primitives';
import { AccountSettingsError } from '../types';

export const DefaultError: AccountSettingsError = (props) => {
  return <Alert variation="error" {...props} />;
};
