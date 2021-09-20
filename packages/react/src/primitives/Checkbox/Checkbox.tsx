import classNames from 'classnames';
import React from 'react';

import { useCheckbox } from './useCheckbox';
import { Flex } from '../Flex';
import { IconCheck } from '../Icon';
import { Input } from '../Input';
import { Text } from '../Text';
import { VisuallyHidden } from '../VisuallyHidden';
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
  isReadOnly,
  isRequired,
  name,
  onChange: onChangeProp,
  size,
  value,
  ...rest
}) => {
  const { dataChecked, dataFocus, onBlur, onChange, onFocus } = useCheckbox(
    // controlled checked should always override uncontrolled way
    checked || defaultChecked,
    onChangeProp
  );

  return (
    <Flex
      as="label"
      className={classNames(ComponentClassNames.Checkbox, className)}
      data-disabled={isDisabled}
    >
      <VisuallyHidden>
        <Input
          checked={checked}
          className={ComponentClassNames.CheckboxInput}
          defaultChecked={defaultChecked}
          id={id}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          isRequired={isRequired}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          type="checkbox"
          value={value}
          {...rest}
        />
      </VisuallyHidden>
      <Flex
        aria-hidden="true"
        as="span"
        className={ComponentClassNames.CheckboxButton}
        data-checked={dataChecked}
        data-disabled={isDisabled}
        data-focus={dataFocus}
      >
        <IconCheck
          className={ComponentClassNames.CheckboxIcon}
          data-checked={dataChecked}
          data-disabled={isDisabled}
          data-emphasized={isEmphasized}
          data-focus={dataFocus}
          size={size}
        />
      </Flex>
      {children && (
        <Text
          as="span"
          className={ComponentClassNames.CheckboxLabel}
          data-disabled={isDisabled}
        >
          {children}
        </Text>
      )}
    </Flex>
  );
};
