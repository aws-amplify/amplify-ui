import * as React from 'react';
import { ShowPasswordButtonProps } from '../types/';
import { Button } from '../Button';
import { ComponentClassNames } from '../shared/constants';
import { IconVisibility } from '../Icon';
import { Text } from '../Text';
import classNames from 'classnames';

export const ShowPasswordButton: React.FC<ShowPasswordButtonProps> = ({
  onClick = () => {},
}) => {
  return (
    <Button
      className={classNames(
        ComponentClassNames.FieldShowPassword,
        ComponentClassNames.FieldGroupField
      )}
      onClick={onClick}
    >
      <Text className="sr-only">Show password</Text>
      <IconVisibility size="large" alt="" />
    </Button>
  );
};
