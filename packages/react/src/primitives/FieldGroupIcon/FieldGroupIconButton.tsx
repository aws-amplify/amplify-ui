import * as React from 'react';
import classNames from 'classnames';

import { Button } from '../Button';
import { ComponentClassNames } from 'src';
import { FieldGroupIcon } from './FieldGroupIcon';
import { FieldGroupIconButtonProps } from '../types';

export const FieldGroupIconButton: React.FC<FieldGroupIconButtonProps> = (
  props
) => {
  const { children, className } = props;
  return (
    <FieldGroupIcon
      as={Button}
      className={classNames(
        ComponentClassNames.FieldGroupIconButton,
        className
      )}
      {...props}
    >
      {children}
    </FieldGroupIcon>
  );
};
