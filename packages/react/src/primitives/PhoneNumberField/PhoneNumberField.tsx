import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { CountryCodeSelect } from './CountryCodeSelect';
import { PhoneNumberFieldProps, Primitive } from '../types';
import { SharedText } from '../shared/i18n';
import { TextField } from '../TextField';

const PhoneNumberFieldPrimitive: Primitive<PhoneNumberFieldProps, 'input'> = (
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
    selectStyles,
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
          // CountryCodeSelect is a SelectField, so to send style props to it
          // we send them to its inputStyles. Get it?
          inputStyles={selectStyles}
        />
      }
      autoComplete={autoComplete}
      className={classNames(ComponentClassNames.PhoneNumberField, className)}
      hasError={hasError}
      isDisabled={isDisabled}
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
