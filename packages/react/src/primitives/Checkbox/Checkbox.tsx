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
import { useTestId } from '../utils/testUtils';

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

  const buttonTestId = useTestId(testId, ComponentClassNames.CheckboxButton);
  const iconTestId = useTestId(testId, ComponentClassNames.CheckboxIcon);
  const labelTestId = useTestId(testId, ComponentClassNames.CheckboxLabel);

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
      {...rest}
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
        testId={buttonTestId}
      >
        <IconCheck
          className={ComponentClassNames.CheckboxIcon}
          data-checked={dataChecked}
          data-disabled={isDisabled}
          data-testid={iconTestId}
          size={size}
        />
      </Flex>
      {children && (
        <Text
          as="span"
          className={ComponentClassNames.CheckboxLabel}
          data-disabled={isDisabled}
          data-testid={labelTestId}
        >
          {children}
        </Text>
      )}
    </Flex>
  );
};
