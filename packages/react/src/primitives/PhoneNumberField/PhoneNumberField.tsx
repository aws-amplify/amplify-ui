import classNames from 'classnames';

import { CountryCodeSelect } from './CountryCodeSelect';
import { TextField } from '../TextField';
import { ComponentClassNames } from '../shared/constants';
import { SharedText } from '../shared/i18n';
import { PhoneNumberFieldProps } from '../types';

export const PhoneNumberField: React.FC<PhoneNumberFieldProps> = ({
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
  ...rest
}) => {
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
          size={size}
          variation={variation}
        />
      }
      autoComplete={autoComplete}
      className={classNames(ComponentClassNames.PhoneNumberField, className)}
      hasError={hasError}
      isDisabled={isDisabled}
      onInput={onInput}
      size={size}
      type="tel"
      variation={variation}
      {...rest}
    />
  );
};
