import { countryDialCodes } from '@aws-amplify/ui';

import { SelectField } from '../SelectField';
import { TextField } from '../TextField';
import { PhoneNumberFieldProps } from '../types';

export const PhoneNumberField: React.FC<PhoneNumberFieldProps> = ({
  defaultCountryCode,
  errorMessage,
  label,
  labelHidden = false,
  name = 'phone_number',
  onChange,
  placeholder,
  ...rest
}) => {
  return (
    <TextField
      inputStartComponents={
        <SelectField
          name="country_code"
          label="country code"
          labelHidden={labelHidden}
          defaultValue={defaultCountryCode}
        >
          {countryDialCodes.map((dialCode) => (
            <option key={dialCode} value={dialCode}>
              {dialCode}
            </option>
          ))}
        </SelectField>
      }
      type={'tel'}
      name={name}
      placeholder={placeholder}
      label={label}
      labelHidden={labelHidden}
      autoComplete="username"
      errorMessage={errorMessage}
      {...rest}
    />
  );
};
