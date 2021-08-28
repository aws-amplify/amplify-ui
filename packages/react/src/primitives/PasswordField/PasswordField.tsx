import classNames from 'classnames';
import * as React from 'react';
import { ShowPasswordButton } from './ShowPasswordButton';

import { ComponentClassNames } from '../shared/constants';
import { TextField } from '../TextField';
import { PasswordFieldProps, TextFieldType } from '../types';

export const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  className,
  hideShowPassword = false,
  ...rest
}) => {
  const [type, setType] = React.useState<TextFieldType>('password');

  const showPasswordOnClick = React.useCallback(() => {
    console.log('hello from showpassword click', type);
    if (type === 'password') {
      setType('text');
    } else {
      setType('password');
    }
  }, [setType, type]);

  return (
    <TextField
      inputEndComponent={
        hideShowPassword ? null : (
          <ShowPasswordButton onClick={showPasswordOnClick} />
        )
      }
      type={type}
      label={label}
      className={classNames(ComponentClassNames.PasswordField, className)}
      {...rest}
    />
  );
};
