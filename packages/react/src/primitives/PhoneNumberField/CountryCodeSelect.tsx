import { useMemo } from 'react';
import classNames from 'classnames';
import { countryDialCodes } from '@aws-amplify/ui';

import { SelectField } from '../SelectField';
import { ComponentClassNames } from '../shared/constants';
import { CountryCodeSelectProps } from '../types';

export const CountryCodeSelect: React.FC<CountryCodeSelectProps> = ({
  className,
  ...props
}) => {
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
      className={classNames(ComponentClassNames.CountryCodeSelect, className)}
      labelHidden={true}
      {...props}
    >
      {countryCodeOptions}
    </SelectField>
  );
};
