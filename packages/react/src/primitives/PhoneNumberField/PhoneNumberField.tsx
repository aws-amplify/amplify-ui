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
    dialCodeName,
    countryCodeLabel = ComponentText.PhoneNumberField.countryCodeLabel,
    dialCodeLabel = ComponentText.PhoneNumberField.countryCodeLabel,
    defaultCountryCode,
    defaultDialCode,
    hasError,
    isDisabled,
    isReadOnly,
    onCountryCodeChange,
    onDialCodeChange,
    onInput,
    size,
    type,
    variation,
    countryCodeRef,
    dialCodeRef,
    dialCodeList,
    ...rest
  },
  ref
) => {
  /**
   * Merge all dial/country code values in preparation of countryCode values being removed preferring dial code values
   */
  dialCodeName = dialCodeName || countryCodeName;
  dialCodeLabel = dialCodeLabel || countryCodeLabel;
  defaultDialCode = defaultDialCode || defaultCountryCode;
  onDialCodeChange = onDialCodeChange || onCountryCodeChange;
  dialCodeRef = dialCodeRef || countryCodeRef;

  return (
    <TextField
      outerStartComponent={
        <CountryCodeSelect
          defaultValue={defaultDialCode}
          dialCodeList={dialCodeList}
          className={className}
          hasError={hasError}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          label={dialCodeLabel}
          name={dialCodeName}
          onChange={onDialCodeChange}
          ref={dialCodeRef}
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
