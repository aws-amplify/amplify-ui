import React from 'react';
import { Alert } from '../../../primitives';
import type { ErrorMessageComponent } from '../types';

export const DefaultErrorMessage: ErrorMessageComponent = (props) => {
  return <Alert variation="error" {...props} />;
};
