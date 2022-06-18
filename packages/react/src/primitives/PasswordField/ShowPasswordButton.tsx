import * as React from 'react';

import { Button } from '../Button';
import { ComponentClassNames, ComponentText } from '../shared/constants';
import { IconVisibility, IconVisibilityOff } from '../Icon/internal';
import { Primitive, ShowPasswordButtonProps } from '../types';

const ariaLabelText = ComponentText.PasswordField;

const ShowPasswordButtonPrimitive: Primitive<
  ShowPasswordButtonProps,
  typeof Button
> = (
  {
    fieldType,
    size,
    hidePasswordButtonLabel,
    showPasswordButtonLabel,
    ...rest
  },
  ref
) => {
  return (
    <Button
      ariaLabel={
        fieldType === 'password'
          ? showPasswordButtonLabel || ariaLabelText.showPasswordButtonLabel
          : hidePasswordButtonLabel || ariaLabelText.hidePasswordButtonLabel
      }
      className={ComponentClassNames.FieldShowPassword}
      ref={ref}
      size={size}
      {...rest}
    >
      {fieldType === 'password' ? (
        <IconVisibility size={size} />
      ) : (
        <IconVisibilityOff size={size} />
      )}
    </Button>
  );
};

export const ShowPasswordButton = React.forwardRef(ShowPasswordButtonPrimitive);

ShowPasswordButton.displayName = 'ShowPasswordButton';
