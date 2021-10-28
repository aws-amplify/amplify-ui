import classNames from 'classnames';

import { useCheckbox } from './useCheckbox';
import { Flex } from '../Flex';
import { IconCheck } from '../Icon';
import { Input } from '../Input';
import { Text } from '../Text';
import { VisuallyHidden } from '../VisuallyHidden';
import { CheckboxProps } from '../types/checkbox';
import { Primitive } from '../types/view';
import { splitPrimitiveProps } from '../shared/styleUtils';
import { ComponentClassNames } from '../shared/constants';
import { useTestId } from '../utils/testUtils';

export const Checkbox: Primitive<CheckboxProps, 'input'> = ({
  checked,
  children,
  className,
  defaultChecked,
  hasError,
  id,
  isDisabled,
  onChange: onChangeProp,
  size,
  testId,
  ..._rest
}) => {
  const { baseStyleProps, flexContainerStyleProps, rest } =
    splitPrimitiveProps(_rest);

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
      as="label"
      className={classNames(ComponentClassNames.Checkbox, className)}
      data-disabled={isDisabled}
      testId={testId}
      {...baseStyleProps}
      {...flexContainerStyleProps}
    >
      <VisuallyHidden>
        <Input
          checked={checked}
          className={ComponentClassNames.CheckboxInput}
          defaultChecked={defaultChecked}
          id={id}
          isDisabled={isDisabled}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          type="checkbox"
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
