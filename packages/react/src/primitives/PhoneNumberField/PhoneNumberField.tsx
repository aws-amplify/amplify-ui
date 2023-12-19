import * as React from 'react';
import { classNames } from '@aws-amplify/ui';

import { ComponentClassName } from '@aws-amplify/ui';
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
    ...rest
  },
  ref
) => {
  // state for the current dial code and default to the defaultDialCode
  const [dialCode, setDialCode] = React.useState<string>(defaultDialCode ?? '');

  // state for the formatted phone number and default to the defaultValue
  const [formattedNumber, setFormattedNumber] = React.useState<string>(
    formatPhoneNumber(dialCode, defaultValue?.toString() ?? '')
  );

  const onNumberChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const phoneNumber = event.target.value;
      // format the phone number with the current dial code
      const formatted = formatPhoneNumber(dialCode, phoneNumber);
      setFormattedNumber(formatted);
      onChange?.(event);
    },
    [dialCode, onChange]
  );

  const onDialCodeChangeWrapper = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const code = event.target.value;
      // Call the onDialCodeChange prop if it exists
      setDialCode(code);
      // Reformat the phone number with the new dial code
      const formatted = formatPhoneNumber(code, formattedNumber);
      setFormattedNumber(formatted);
      onDialCodeChange?.(event);
    },
    [formattedNumber, onDialCodeChange]
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
      // Pass the onChange function to the TextField and use the formattedNumber state as the value
      onChange={onNumberChange}
      value={formattedNumber}
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
