import * as React from 'react';

import { Button } from '../Button';
import { VisuallyHidden } from '../VisuallyHidden';
import { ComponentClassNames, ComponentText } from '../shared/constants';
import { IconVisibility, IconVisibilityOff } from '../Icon/internal';
import {
  ForwardRefPrimitive,
  Primitive,
  BaseShowPasswordButtonProps,
  ShowPasswordButtonProps,
} from '../types';

const { passwordIsHidden, passwordIsShown, showPassword } =
  ComponentText.PasswordField;

const ShowPasswordButtonPrimitive: Primitive<
  ShowPasswordButtonProps,
  'button'
> = (
  {
    fieldType,
    passwordIsHiddenLabel = passwordIsHidden,
    passwordIsShownLabel = passwordIsShown,
    showPasswordButtonLabel = showPassword,
    size,
    ...rest
  },
  ref
) => {
  return (
    <Button
      aria-checked={fieldType !== 'password'}
      ariaLabel={showPasswordButtonLabel}
      className={ComponentClassNames.FieldShowPassword}
      ref={ref}
      role="switch"
      size={size}
      {...rest}
    >
      <VisuallyHidden aria-live="polite">
        {fieldType === 'password'
          ? passwordIsHiddenLabel
          : passwordIsShownLabel}
      </VisuallyHidden>
      {fieldType === 'password' ? (
        <IconVisibility size={size} />
      ) : (
        <IconVisibilityOff size={size} />
      )}
    </Button>
  );
};

export const ShowPasswordButton: ForwardRefPrimitive<
  BaseShowPasswordButtonProps,
  'button'
> = React.forwardRef(ShowPasswordButtonPrimitive);

ShowPasswordButton.displayName = 'ShowPasswordButton';
