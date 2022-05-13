import * as React from 'react';

import { FieldControl } from '../shared/GetFieldControls';
import { PasswordFieldProps } from '@aws-amplify/ui-react';
import { useTextFieldProps } from '../textfield/useTextFieldProps';

export type PasswordFieldDocsProps = Omit<PasswordFieldProps, '[key]'>;

interface UsePasswordFieldProps {
  (initialValues: PasswordFieldDocsProps): FieldControl[];
}

export const usePasswordFieldProps: UsePasswordFieldProps = (initialValues) => {
  const propState = useTextFieldProps(initialValues);
  return [
    ...propState,
    [
      ...React.useState<PasswordFieldDocsProps['hideShowPassword']>(
        initialValues.hideShowPassword
      ),
      'hideShowPassword',
      'checkbox',
    ],
  ] as FieldControl[];
};
