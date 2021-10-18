import classNames from 'classnames';

import { Primitive, ShowPasswordButtonProps } from '../types';
import { Button } from '../Button';
import { ComponentClassNames } from '../shared/constants';
import { IconVisibility, IconVisibilityOff } from '../Icon';
import { SharedText } from '../shared/i18n';

const ariaLabelText = SharedText.ShowPasswordButton.ariaLabel;

export const ShowPasswordButton: Primitive<ShowPasswordButtonProps, 'button'> =
  ({ className, fieldType, size, ...rest }) => (
    <Button
      className={classNames(ComponentClassNames.FieldShowPassword, className)}
      size={size}
      ariaLabel={
        fieldType === 'password'
          ? ariaLabelText.showPassword
          : ariaLabelText.hidePassword
      }
      {...rest}
    >
      {fieldType === 'password' ? (
        <IconVisibility size={size} />
      ) : (
        <IconVisibilityOff size={size} />
      )}
    </Button>
  );
