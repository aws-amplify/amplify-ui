import { createContextUtilities } from '../../../utils';
import { FieldContextType } from './types';

const { Context: FieldContext, useContext: useField } =
  createContextUtilities<FieldContextType>({
    contextName: 'Field',
    errorMessage: '`useField` must be used within a `FieldProvider',
  });

export { FieldContext, useField };
