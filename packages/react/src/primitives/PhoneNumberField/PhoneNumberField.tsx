import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { CountryCodeSelect } from './CountryCodeSelect';
import { PhoneNumberFieldProps, Primitive } from '../types';
import { ComponentText } from '../shared/constants';
import { TextField } from '../TextField';
import { useDeprecationWarning } from '../../hooks/useDeprecationWarning';

const PhoneNumberFieldPrimitive: Primitive<PhoneNumberFieldProps, 'input'> = (
  {
    autoComplete = 'tel-national',
    className,
    countryCodeName,
    countryCodeLabel = ComponentText.PhoneNumberField.dialCodeLabel,
    countryCodeRef,
    defaultCountryCode,
    defaultDialCode,
    dialCodeLabel = ComponentText.PhoneNumberField.dialCodeLabel,
    dialCodeList,
    dialCodeName,
    dialCodeRef,
    hasError,
    isDisabled,
    isReadOnly,
    onCountryCodeChange,
    onDialCodeChange,
    onInput,
    size,
    type,
    variation,
    ...rest
  },
  ref
) => {
  // Merge all dial/country code values in preparation of countryCode values being removed preferring dial code values
  const codeName = dialCodeName || countryCodeName;
  const codeLabel = dialCodeLabel || countryCodeLabel;
  const defaultCode = defaultDialCode || defaultCountryCode;
  const onCodeChange = onDialCodeChange || onCountryCodeChange;
  const codeRef = dialCodeRef || countryCodeRef;

  const deprecationMessage =
    'The PhoneNumberField component props: countryCodeName, countryCodeLabel, defaultCountryCode, onCountryCodeChange, and countryCodeRef props are deprecated and will be removed in the next major release of @aws-amplify/ui-react. Please update to dialCodeName, dialCodeLabel, defaultDialCode, onDialCodeChange, and dialCodeRef respectively.';
  const shouldWarn =
    countryCodeName ||
    countryCodeLabel !== ComponentText.PhoneNumberField.dialCodeLabel ||
    defaultCountryCode ||
    onCountryCodeChange ||
    countryCodeRef;

  useDeprecationWarning({
    shouldWarn: !!shouldWarn,
    message: deprecationMessage,
  });

  return (
    <TextField
      outerStartComponent={
        <CountryCodeSelect
          defaultValue={defaultCode}
          dialCodeList={dialCodeList}
          className={className}
          hasError={hasError}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          label={codeLabel}
          name={codeName}
          onChange={onCodeChange}
          ref={codeRef}
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
