import React from 'react';
import { Alert } from '../../../primitives';
import { ErrorComponent } from '../types';

export const DefaultError: ErrorComponent = (props) => {
  return <Alert variation="error" {...props} />;
};
