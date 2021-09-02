import * as React from 'react';
import { ShowPasswordButtonProps } from '../types/';
import { Button } from '../Button';
import { ComponentClassNames } from '../shared/constants';
import { IconVisibility, IconVisibilityOff } from '../Icon';
import { Text } from '../Text';
import classNames from 'classnames';
import { SharedText } from '../shared/i18n';

const ariaLabelText = SharedText.ShowPasswordButton.ariaLabel;

export const ShowPasswordButton: React.FC<ShowPasswordButtonProps> = ({
  fieldType,
  size,
  onClick,
}) => {
  return (
    <Button
      className={classNames(ComponentClassNames.FieldShowPassword)}
      onClick={onClick}
      size={size}
      ariaLabel={
        fieldType === 'password'
          ? ariaLabelText.showPassword
          : ariaLabelText.hidePassword
      }
    >
      {fieldType === 'password' ? (
        <IconVisibility size={size} />
      ) : (
        <IconVisibilityOff size={size} />
      )}
    </Button>
  );
};
