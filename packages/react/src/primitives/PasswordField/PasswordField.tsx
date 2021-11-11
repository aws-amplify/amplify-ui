import classNames from 'classnames';
import * as React from 'react';
import { ShowPasswordButton } from './ShowPasswordButton';

import { ComponentClassNames } from '../shared/constants';
import { PasswordFieldProps, PasswordFieldType, Primitive } from '../types';
import { TextField } from '../TextField';

export const PasswordField: Primitive<PasswordFieldProps, 'input'> = ({
  autoComplete = 'current-password',
  label,
  className,
  hideShowPassword = false,
  size,
  ...rest
}) => {
  const [type, setType] = React.useState<PasswordFieldType>('password');

  const showPasswordOnClick = React.useCallback(() => {
    if (type === 'password') {
      setType('text');
    } else {
      setType('password');
    }
  }, [setType, type]);

  return (
    <TextField
      autoComplete={autoComplete}
      isMultiline={false}
      outerEndComponent={
        hideShowPassword ? null : (
          <ShowPasswordButton
            fieldType={type}
            onClick={showPasswordOnClick}
            size={size}
          />
        )
      }
      size={size}
      type={type}
      label={label}
      className={classNames(ComponentClassNames.PasswordField, className)}
      {...rest}
    />
  );
};

PasswordField.displayName = 'PasswordField';
