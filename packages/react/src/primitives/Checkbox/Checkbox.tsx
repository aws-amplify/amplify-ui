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
import { useTestId } from './useTestId';

export const Checkbox: React.FC<CheckboxProps> = ({
  alignContent,
  alignItems,
  backgroundColor,
  checked,
  children,
  className,
  color,
  defaultChecked,
  direction,
  hasError,
  id,
  isDisabled,
  isReadOnly,
  isRequired,
  justifyContent,
  gap,
  name,
  onChange: onChangeProp,
  size,
  testId,
  value,
  wrap,
  ...rest
}) => {
  // controlled way should always override uncontrolled way
  const initialChecked = checked !== undefined ? checked : defaultChecked;
  const { dataChecked, dataFocus, onBlur, onChange, onFocus } = useCheckbox(
    initialChecked,
    onChangeProp
  );

  return (
    <Flex
      alignContent={alignContent}
      alignItems={alignItems}
      as="label"
      className={classNames(ComponentClassNames.Checkbox, className)}
      data-disabled={isDisabled}
      direction={direction}
      gap={gap}
      justifyContent={justifyContent}
      wrap={wrap}
      testId={testId}
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
        data-error={hasError}
        testId={useTestId(testId, ComponentClassNames.CheckboxButton)}
      >
        <IconCheck
          className={ComponentClassNames.CheckboxIcon}
          data-checked={dataChecked}
          data-disabled={isDisabled}
          data-testid={useTestId(testId, ComponentClassNames.CheckboxIcon)}
          size={size}
        />
      </Flex>
      {children && (
        <Text
          as="span"
          className={ComponentClassNames.CheckboxLabel}
          data-disabled={isDisabled}
          data-testid={useTestId(testId, ComponentClassNames.CheckboxLabel)}
        >
          {children}
        </Text>
      )}
    </Flex>
  );
};
