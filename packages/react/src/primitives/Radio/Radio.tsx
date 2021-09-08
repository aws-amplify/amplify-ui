import classNames from 'classnames';
import React from 'react';

import { Flex } from '../Flex';
import { Input } from '../Input';
import { Label } from '../Label';
import { RadioProps } from '../types';
import { ComponentClassNames, useAmplifyFieldID } from '../shared';

export const Radio: React.FC<RadioProps> = ({
  children,
  className,
  id,
  isDisabled,
  value,
  ...rest
}) => {
  const fieldId = useAmplifyFieldID(id);
  return (
    <Flex alignItems="center" justifyContent="flex-start">
      <Input
        className={classNames(ComponentClassNames.Radio, className)}
        id={id}
        isDisabled={isDisabled}
        type="radio"
        value={value}
        {...rest}
      />
      <Label htmlFor={fieldId}>{children}</Label>
    </Flex>
  );
};
