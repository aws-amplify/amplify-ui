import classNames from 'classnames';
import React, { ChangeEvent, FocusEvent, useState } from 'react';

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
  isReadOnly,
  isRequired,
  name,
  onChange: onChangeProp,
  size,
  value,
  ...rest
}) => {
  const [dataChecked, setDataChecked] = useState(checked || defaultChecked);
  const [dataFocus, setDataFocus] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDataChecked(e.target.checked);
    if (onChangeProp) {
      onChangeProp(e);
    }
  };

  const onFocus = (e: FocusEvent<HTMLInputElement>) => {
    console.log(e.type);
    setDataFocus(true);
  };

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    setDataFocus(false);
  };

  return (
    <Flex
      as="label"
      className={classNames(ComponentClassNames.Checkbox, className)}
      data-disabled={isDisabled}
    >
      <Input
        checked={checked}
        className={classNames(
          ComponentClassNames.CheckboxInput,
          ComponentClassNames.VisuallyHidden
        )}
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
