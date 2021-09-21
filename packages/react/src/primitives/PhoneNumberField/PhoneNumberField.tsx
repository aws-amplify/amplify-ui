import { countryDialCodes } from '@aws-amplify/ui';

import { SelectField } from '../SelectField';
import { TextField } from '../TextField';
import { PhoneNumberFieldProps } from '../types';

export const PhoneNumberField: React.FC<PhoneNumberFieldProps> = ({
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
          name="country_code"
          label="country code"
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
      defaultValue={defaultValue}
      errorMessage={errorMessage}
      name={name}
      label={label}
      labelHidden={labelHidden}
      placeholder={placeholder}
      type={'tel'}
      {...rest}
    />
  );
};
