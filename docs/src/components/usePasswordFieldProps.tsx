import { PasswordFieldProps } from '@aws-amplify/ui-react';
import * as React from 'react';

import { FieldControl } from '../pages/components/shared/GetFieldControls';
import { useTextFieldProps } from '../pages/components/textfield/useTextFieldProps';

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
  ];
};
