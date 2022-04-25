import { PasswordFieldProps } from '@aws-amplify/ui-react';
import * as React from 'react';

import { FieldControl } from '../pages/components/shared/GetFieldControls';
import { useTextFieldProps } from '../pages/components/textfield/useTextFieldProps';

export type PasswordFieldDocsProps = Omit<PasswordFieldProps, '[key]'>;

interface UsePasswordFieldProps {
  (initialValues: PasswordFieldDocsProps): FieldControl[];
}

export const usePasswordFieldProps: UsePasswordFieldProps = (initialValues) => {
  const [hideShowPassword, setHideShowPassword] = React.useState<
    PasswordFieldDocsProps['hideShowPassword']
  >(initialValues.hideShowPassword);
  const [autoComplete, setAutoComplete] = React.useState<
    PasswordFieldDocsProps['autoComplete']
  >(initialValues.autoComplete);
  const propState = useTextFieldProps(initialValues);
  return [
    ...propState,
    autoComplete,
    setAutoComplete,
    hideShowPassword,
    setHideShowPassword,
  ];
};
