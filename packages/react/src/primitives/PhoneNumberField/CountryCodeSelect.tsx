import { useMemo } from 'react';
import { countryDialCodes } from '@aws-amplify/ui';

import { SelectField } from '../SelectField';
import { ComponentClassNames } from '../shared/constants';
import { CountryCodeSelectProps } from '../types';

export const CountryCodeSelect: React.FC<CountryCodeSelectProps> = (props) => {
  const countryCodeOptions = useMemo(
    () =>
      countryDialCodes.map((dialCode) => (
        <option key={dialCode} value={dialCode}>
          {dialCode}
        </option>
      )),
    [countryDialCodes]
  );

  return (
    <SelectField
      autoComplete="tel-country-code"
      className={ComponentClassNames.CountryCodeSelect}
      labelHidden={true}
      {...props}
    >
      {countryCodeOptions}
    </SelectField>
  );
};
