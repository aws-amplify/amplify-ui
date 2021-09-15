import classNames from 'classnames';
import React from 'react';

import { Flex } from '../Flex';
import { IconCheck } from '../Icon';
import { Input } from '../Input';
import { Text } from '../Text';
import { CheckboxProps } from '../types/checkbox';
import { ComponentClassNames } from '../shared/constants';

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  children,
  className,
  defaultChecked,
  id,
  isDisabled,
  isEmphasized,
  isIndeterminate,
  isReadOnly,
  isRequired,
  name,
  onChange,
  size,
  value,
  ...rest
}) => {
  // for uncontrolled component
  const shouldBeDefaultChecked =
    defaultChecked !== undefined ? defaultChecked : undefined;

  // for controlled component
  const shouldBeChecked = checked !== undefined ? checked : undefined;

  return (
    <Flex
      as="label"
      className={classNames(ComponentClassNames.Checkbox, className)}
    >
      <Input
        checked={shouldBeChecked}
        className={classNames(
          ComponentClassNames.CheckboxInput,
          ComponentClassNames.VisuallyHidden
        )}
        defaultChecked={shouldBeDefaultChecked}
        id={id}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
        name={name}
        onChange={onChange}
        type="checkbox"
        value={value}
        {...rest}
      />
      <Flex as="span" className={ComponentClassNames.CheckboxButton}>
        <IconCheck data-size={size} />
      </Flex>
      {children && (
        <Text as="span" className={ComponentClassNames.CheckboxLabel}>
          {children}
        </Text>
      )}
    </Flex>
  );
};
