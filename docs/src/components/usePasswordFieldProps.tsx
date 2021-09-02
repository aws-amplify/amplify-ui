import { PasswordFieldProps } from '@aws-amplify/ui-react';
import { useState } from 'react';
import { FieldControl } from './GetFieldControls';
import { useTextFieldProps } from './useTextFieldProps';

export type PasswordFieldDocsProps = Omit<PasswordFieldProps, '[key]'>;

interface UsePasswordFieldProps {
  (initialValues: PasswordFieldDocsProps): FieldControl[];
}

export const usePasswordFieldProps: UsePasswordFieldProps = (initialValues) => {
  const propState = useTextFieldProps(initialValues);
  return [
    ...propState,
    [
      ...useState<PasswordFieldDocsProps['hideShowPassword']>(
        initialValues.hideShowPassword
      ),
      'hideShowPassword',
      'checkbox',
    ],
  ];
};
