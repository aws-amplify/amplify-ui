import * as React from 'react';
import classNames from 'classnames';

import { CountryCodeSelect } from './CountryCodeSelect';
import { TextField } from '../TextField';
import { ComponentClassNames } from '../shared/constants';
import { SharedText } from '../shared/i18n';
import { PhoneNumberFieldProps, PrimitiveWithForwardRef } from '../types';

const PhoneNumberFieldPrimitive: PrimitiveWithForwardRef<
  PhoneNumberFieldProps,
  'input'
> = (
  {
    autoComplete = 'tel-national',
    className,
    countryCodeName,
    countryCodeLabel = SharedText.CountryCodeSelect.ariaLabel,
    defaultCountryCode,
    hasError,
    isDisabled,
    onCountryCodeChange,
    onInput,
    size,
    type,
    variation,
    countryCodeRef,
    ...rest
  },
  ref
) => {
  return (
    <TextField
      outerStartComponent={
        <CountryCodeSelect
          defaultValue={defaultCountryCode}
          className={className}
          hasError={hasError}
          isDisabled={isDisabled}
          label={countryCodeLabel}
          name={countryCodeName}
          onChange={onCountryCodeChange}
          ref={countryCodeRef}
          size={size}
          variation={variation}
        />
      }
      autoComplete={autoComplete}
      className={classNames(ComponentClassNames.PhoneNumberField, className)}
      hasError={hasError}
      isDisabled={isDisabled}
      isMultiline={false}
      onInput={onInput}
      ref={ref}
      size={size}
      type="tel"
      variation={variation}
      {...rest}
    />
  );
};

export const PhoneNumberField = React.forwardRef(PhoneNumberFieldPrimitive);

PhoneNumberField.displayName = 'PhoneNumberField';
