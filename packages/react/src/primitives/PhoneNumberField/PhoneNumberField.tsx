import classNames from 'classnames';
import { countryDialCodes } from '@aws-amplify/ui';

import { SelectField } from '../SelectField';
import { TextField } from '../TextField';
import { ComponentClassNames } from '../shared/constants';
import { PhoneNumberFieldProps } from '../types';

export const PhoneNumberField: React.FC<PhoneNumberFieldProps> = ({
  autoComplete = 'tel-national',
  className,
  defaultCountryCode,
  defaultValue,
  errorMessage,
  label,
  labelHidden = false,
  name = 'phone_number',
  onChange,
  placeholder,
  value,
  ...rest
}) => {
  return (
    <TextField
      inputStartComponents={
        <SelectField
          autoComplete="tel-country-code"
          name="country_code"
          label="Country Code"
          labelHidden={true}
          defaultValue={defaultCountryCode}
          {...rest}
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
      defaultValue={defaultValue}
      errorMessage={errorMessage}
      name={name}
      label={label}
      labelHidden={labelHidden}
      placeholder={placeholder}
      type="tel"
      {...rest}
    />
  );
};
