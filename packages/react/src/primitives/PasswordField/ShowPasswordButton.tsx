import * as React from 'react';

import { Button } from '../Button';
import { VisuallyHidden } from '../VisuallyHidden';
import { ComponentClassNames, ComponentText } from '../shared/constants';
import { IconVisibility, IconVisibilityOff } from '../Icon/internal';
import { Primitive, ShowPasswordButtonProps } from '../types';
import { classNameModifierByFlag } from '../shared/utils';
import classNames from 'classnames';

const { passwordIsHidden, passwordIsShown, showPassword } =
  ComponentText.PasswordField;

const ShowPasswordButtonPrimitive: Primitive<
  ShowPasswordButtonProps,
  typeof Button
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
  const showPasswordButtonClass = classNames(
    ComponentClassNames.FieldShowPassword,
    classNameModifierByFlag(
      ComponentClassNames.FieldShowPassword,
      'error',
      hasError
    )
  );

  return (
    <Button
      aria-checked={fieldType !== 'password'}
      ariaLabel={showPasswordButtonLabel}
      className={showPasswordButtonClass}
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

export const ShowPasswordButton = React.forwardRef(ShowPasswordButtonPrimitive);

ShowPasswordButton.displayName = 'ShowPasswordButton';
