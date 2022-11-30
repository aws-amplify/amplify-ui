import React from 'react';
import { Alert } from '../../../primitives';
import { ComponentError } from '../types';

export const DefaultError: ComponentError = (props) => {
  return <Alert variation="error" {...props} />;
};
