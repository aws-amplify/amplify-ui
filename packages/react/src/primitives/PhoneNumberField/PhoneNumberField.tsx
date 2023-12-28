import * as React from 'react';
import { classNames, ComponentClassName, isFunction } from '@aws-amplify/ui';
import { DialCodeSelect } from './DialCodeSelect';
import {
  PhoneNumberFieldProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { ComponentText } from '../shared/constants';
import { TextField } from '../TextField';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';
import { formatPhoneNumber } from './utils';

const PhoneNumberFieldPrimitive: Primitive<PhoneNumberFieldProps, 'input'> = (
  {
    autoComplete = 'tel-national',
    className,
    defaultDialCode,
    dialCodeLabel = ComponentText.PhoneNumberField.countryCodeLabel,
    dialCodeList,
    dialCodeName,
    dialCodeRef,
    hasError,
    isDisabled,
    isReadOnly,
    onDialCodeChange,
    onInput,
    size,
    variation,
    defaultValue,
    onChange,
    value,
    formatValue,
    ...rest
  },
  ref
) => {
  // state for the current dial code and default to the defaultDialCode
  const [dialCode, setDialCode] = React.useState<string>(defaultDialCode ?? '');
  // state for the formatted phone number and default to the defaultValue
  const [formattedValue, setFormattedValue] = React.useState<string>(
    formatPhoneNumber(
      dialCode,
      value?.toString() ?? defaultValue?.toString() ?? ''
    )
  );

  React.useEffect(() => {
    if (value !== undefined) {
      // We are controlled component
      setFormattedValue(value.toString());
    }
  }, [value, setFormattedValue]);

  const onValueChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
      if (value === undefined) {
        // We are a uncontrolled component
        const number = event.target.value ?? defaultValue?.toString();
        const formatted = isFunction(formatValue)
          ? formatValue(dialCode, number)
          : formatPhoneNumber(dialCode, number);
        setFormattedValue(formatted);
      }
    },
    [dialCode, formatValue, onChange, value, defaultValue]
  );

  const onDialCodeChangeWrapper = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const code = event.target.value;
      // Call the onDialCodeChange prop if it exists
      setDialCode(code);
      onDialCodeChange?.(event);
      if (value === undefined) {
        // We are a uncontrolled component
        const number = formattedValue ?? defaultValue?.toString();
        const formatted = isFunction(formatValue)
          ? formatValue(code, number)
          : formatPhoneNumber(code, number);
        setFormattedValue(formatted);
      }
    },
    [formattedValue, defaultValue, value, onDialCodeChange, formatValue]
  );

  return (
    <TextField
      outerStartComponent={
        <DialCodeSelect
          defaultValue={defaultDialCode}
          dialCodeList={dialCodeList}
          className={className}
          hasError={hasError}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          label={dialCodeLabel}
          name={dialCodeName}
          // Pass the onDialCodeChangeWrapper function to the DialCodeSelect
          onChange={onDialCodeChangeWrapper}
          ref={dialCodeRef}
          size={size}
          variation={variation}
        />
      }
      autoComplete={autoComplete}
      className={classNames(ComponentClassName.PhoneNumberField, className)}
      hasError={hasError}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      onInput={onInput}
      onChange={onValueChange}
      value={formattedValue}
      ref={ref}
      size={size}
      type="tel"
      variation={variation}
      {...rest}
    />
  );
};
/**
 * [:book: Docs](https://ui.docs.amplify.aws/react/components/phonenumberfield)
 */
export const PhoneNumberField: ForwardRefPrimitive<
  PhoneNumberFieldProps,
  'input'
> = primitiveWithForwardRef(PhoneNumberFieldPrimitive);
PhoneNumberField.displayName = 'PhoneNumberField';
