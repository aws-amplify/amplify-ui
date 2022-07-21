import * as React from 'react';

import { Button } from '../Button';
import { VisuallyHidden } from '../VisuallyHidden';
import { ComponentClassNames, ComponentText } from '../shared/constants';
import { IconVisibility, IconVisibilityOff } from '../Icon/internal';
import { Primitive, ShowPasswordButtonProps } from '../types';

const { passwordHidden, passwordShown, showPasswordButton } =
  ComponentText.PasswordField;

const ShowPasswordButtonPrimitive: Primitive<
  ShowPasswordButtonProps,
  typeof Button
> = (
  { fieldType, size, showPasswordButtonLabel = showPasswordButton, ...rest },
  ref
) => {
  return (
    <Button
      aria-checked={fieldType === 'password'}
      ariaLabel={showPasswordButtonLabel}
      className={ComponentClassNames.FieldShowPassword}
      ref={ref}
      role="switch"
      size={size}
      {...rest}
    >
      <VisuallyHidden aria-live="polite">
        {fieldType === 'password' ? passwordHidden : passwordShown}
      </VisuallyHidden>
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
