import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { useStableId } from '../shared/utils';
import { FieldErrorMessage, FieldDescription } from '../Field';
import { Flex } from '../Flex';
import { Select } from '../Select';
import { Label } from '../Label';
import { SelectFieldProps, Primitive } from '../types';

export const SelectField: Primitive<SelectFieldProps, 'select'> = (props) => {
  const {
    alignContent,
    alignItems,
    autoComplete,
    children,
    className,
    defaultValue,
    descriptiveText,
    direction = 'column',
    errorMessage,
    gap,
    hasError = false,
    icon,
    iconColor,
    id,
    isDisabled,
    isRequired,
    justifyContent,
    label,
    labelHidden = false,
    onChange,
    placeholder,
    size,
    testId,
    value,
    variation,
    wrap,
    ...rest
  } = props;

  const fieldId = useStableId(id);

  return (
    <Flex
      alignContent={alignContent}
      alignItems={alignItems}
      className={classNames(
        ComponentClassNames.Field,
        ComponentClassNames.SelectField,
        className
      )}
      data-size={size}
      direction={direction}
      gap={gap}
      justifyContent={justifyContent}
      testId={testId}
      wrap={wrap}
    >
      <Label htmlFor={fieldId} visuallyHidden={labelHidden}>
        {label}
      </Label>
      <FieldDescription
        labelHidden={labelHidden}
        descriptiveText={descriptiveText}
      />
      <Select
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        hasError={hasError}
        icon={icon}
        iconColor={iconColor}
        id={fieldId}
        isDisabled={isDisabled}
        isRequired={isRequired}
        onChange={onChange}
        placeholder={placeholder}
        size={size}
        variation={variation}
        value={value}
        {...rest}
      >
        {children}
      </Select>
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Flex>
  );
};

SelectField.displayName = 'SelectField';
