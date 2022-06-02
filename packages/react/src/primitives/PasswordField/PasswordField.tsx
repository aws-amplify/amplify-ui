import classNames from 'classnames';
import * as React from 'react';

import { ComponentClassNames } from '../shared/constants';
import { PasswordFieldProps, PasswordFieldType, Primitive } from '../types';
import { ShowPasswordButton } from './ShowPasswordButton';
import { TextField } from '../TextField';

const PasswordFieldPrimitive: Primitive<PasswordFieldProps, 'input'> = (
  {
    autoComplete = 'current-password',
    label,
    className,
    hideShowPassword = false,
    hidePasswordButtonLabel,
    showPasswordButtonLabel,
    showPasswordButtonRef,
    size,
    ...rest
  },
  ref
) => {
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
            ref={showPasswordButtonRef}
            size={size}
            hidePasswordButtonLabel={hidePasswordButtonLabel}
            showPasswordButtonLabel={showPasswordButtonLabel}
          />
        )
      }
      size={size}
      type={type}
      label={label}
      className={classNames(ComponentClassNames.PasswordField, className)}
      ref={ref}
      {...rest}
    />
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/passwordfield)
 */
export const PasswordField = React.forwardRef(PasswordFieldPrimitive);

PasswordField.displayName = 'PasswordField';
