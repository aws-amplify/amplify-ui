import * as React from 'react';
import classNames from 'classnames';
import { countryDialCodes } from '@aws-amplify/ui';

import { SelectField } from '../SelectField';
import { ComponentClassNames } from '../shared/constants';
import { CountryCodeSelectProps, PrimitiveWithForwardRef } from '../types';

const CountryCodeSelectInner: PrimitiveWithForwardRef<
  CountryCodeSelectProps,
  'select'
> = ({ className, ...props }, ref) => {
  const countryCodeOptions = React.useMemo(
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
      ref={ref}
      {...props}
    >
      {countryCodeOptions}
    </SelectField>
  );
};

export const CountryCodeSelect = React.forwardRef(CountryCodeSelectInner);

CountryCodeSelect.displayName = 'CountryCodeSelect';
