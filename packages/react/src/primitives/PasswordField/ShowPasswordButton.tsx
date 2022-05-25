import * as React from 'react';

import { Button } from '../Button';
import { ComponentClassNames, SharedText } from '../shared/constants';
import { IconVisibility, IconVisibilityOff } from '../Icon';
import { Primitive, ShowPasswordButtonProps } from '../types';

const ariaLabelText = SharedText.ShowPasswordButton.ariaLabel;

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
          ? showPasswordButtonLabel || ariaLabelText.showPassword
          : hidePasswordButtonLabel || ariaLabelText.hidePassword
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
