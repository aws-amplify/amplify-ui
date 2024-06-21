import * as React from 'react';
import { fieldClasses } from '@aws-amplify/ui';

import { Button } from '../Button';
import { VisuallyHidden } from '../VisuallyHidden';
import { ComponentText } from '../shared/constants';
import { IconVisibility, IconVisibilityOff, useIcons } from '../Icon';
import {
  ForwardRefPrimitive,
  Primitive,
  BaseShowPasswordButtonProps,
} from '../types';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

const { passwordIsHidden, passwordIsShown, showPassword } =
  ComponentText.PasswordField;

const ShowPasswordButtonPrimitive: Primitive<
  BaseShowPasswordButtonProps,
  'button'
> = (
  {
    fieldType,
    passwordIsHiddenLabel = passwordIsHidden,
    passwordIsShownLabel = passwordIsShown,
    showPasswordButtonLabel = showPassword,
    size,
    hasError,
    ...rest
  },
  ref
) => {
  const icons = useIcons('passwordField');

  const icon =
    fieldType === 'password'
      ? icons?.visibility ?? <IconVisibility aria-hidden="true" />
      : icons?.visibilityOff ?? <IconVisibilityOff aria-hidden="true" />;

  return (
    <Button
      aria-checked={fieldType !== 'password'}
      ariaLabel={showPasswordButtonLabel}
      className={fieldClasses({
        _element: {
          'show-password': [hasError ? 'error' : undefined],
        },
      })}
      colorTheme={hasError ? 'error' : undefined}
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
      {icon}
    </Button>
  );
};

export const ShowPasswordButton: ForwardRefPrimitive<
  BaseShowPasswordButtonProps,
  'button'
> = primitiveWithForwardRef(ShowPasswordButtonPrimitive);

ShowPasswordButton.displayName = 'ShowPasswordButton';
