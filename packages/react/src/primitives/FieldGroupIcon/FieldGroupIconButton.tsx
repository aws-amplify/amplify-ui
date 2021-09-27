import * as React from 'react';
import classNames from 'classnames';

import { Button } from '../Button';
import { ComponentClassNames } from '../shared/constants';
import { FieldGroupIcon } from './FieldGroupIcon';
import { FieldGroupIconButtonProps } from '../types';

export const FieldGroupIconButton: React.FC<FieldGroupIconButtonProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <FieldGroupIcon
      as={Button}
      className={classNames(
        ComponentClassNames.FieldGroupIconButton,
        className
      )}
      {...rest}
    >
      {children}
    </FieldGroupIcon>
  );
};
