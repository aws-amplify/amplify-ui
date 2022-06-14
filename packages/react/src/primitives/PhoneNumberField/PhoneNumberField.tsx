import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { CountryCodeSelect } from './CountryCodeSelect';
import { PhoneNumberFieldProps, Primitive } from '../types';
import { ComponentText } from '../shared/constants';
import { TextField } from '../TextField';

const PhoneNumberFieldPrimitive: Primitive<PhoneNumberFieldProps, 'input'> = (
  {
    autoComplete = 'tel-national',
    className,
    countryCodeName,
    countryCodeLabel = ComponentText.PhoneNumberField.countryCodeLabel,
    defaultCountryCode,
    hasError,
    isDisabled,
    isReadOnly,
    onCountryCodeChange,
    onInput,
    size,
    type,
    variation,
    countryCodeRef,
    dialCodeList,
    ...rest
  },
  ref
) => {
  return (
    <TextField
      outerStartComponent={
        <CountryCodeSelect
          defaultValue={defaultCountryCode}
          dialCodeList={dialCodeList}
          className={className}
          hasError={hasError}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
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
      isReadOnly={isReadOnly}
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

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/phonenumberfield)
 */
export const PhoneNumberField = React.forwardRef(PhoneNumberFieldPrimitive);

PhoneNumberField.displayName = 'PhoneNumberField';
