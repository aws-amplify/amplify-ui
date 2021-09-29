import classNames from 'classnames';
import { countryDialCodes } from '@aws-amplify/ui';

import { SelectField } from '../SelectField';
import { TextField } from '../TextField';
import { ComponentClassNames } from '../shared/constants';
import { PhoneNumberFieldProps } from '../types';

export const PhoneNumberField: React.FC<PhoneNumberFieldProps> = ({
  autoComplete = 'tel-national',
  className,
  countryCodeName = 'country_code',
  defaultCountryCode,
  isDisabled,
  size,
  type,
  variation,
  ...rest
}) => {
  return (
    <TextField
      inputStartComponents={
        <SelectField
          autoComplete="tel-country-code"
          defaultValue={defaultCountryCode}
          isDisabled={isDisabled}
          label="Country Code"
          labelHidden={true}
          name={countryCodeName}
          size={size}
          variation={variation}
        >
          {countryDialCodes.map((dialCode) => (
            <option key={dialCode} value={dialCode}>
              {dialCode}
            </option>
          ))}
        </SelectField>
      }
      autoComplete={autoComplete}
      className={classNames(ComponentClassNames.PhoneNumberField, className)}
      isDisabled={isDisabled}
      size={size}
      type="tel"
      variation={variation}
      {...rest}
    />
  );
};
