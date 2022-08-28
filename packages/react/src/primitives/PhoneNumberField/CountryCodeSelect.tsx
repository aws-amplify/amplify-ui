import * as React from 'react';
import classNames from 'classnames';
import { countryDialCodes } from '@aws-amplify/ui';

import { ComponentClassNames } from '../shared/constants';
import { DialCodeSelectProps, Primitive } from '../types';
import { SelectField } from '../SelectField';

const DialCodeSelectPrimitive: Primitive<DialCodeSelectProps, 'select'> = (
  { className, dialCodeList, isReadOnly, ...props },
  ref
) => {
  const dialList = dialCodeList ?? countryDialCodes;
  const dialCodeOptions = React.useMemo(
    () =>
      dialList.map((dialCode) => (
        // Regarding the `disabled` attribute, see comment in SelectField below
        <option key={dialCode} value={dialCode} disabled={isReadOnly}>
          {dialCode}
        </option>
      )),
    [dialList, isReadOnly]
  );

  return (
    <SelectField
      /*
          Since <select> elements do not support the `readonly` html attribute, it is suggested to use the `disabled` html attribute 
          so that a screen reader will announce something to the user about the interactivity of the options list ( https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly)
        */
      aria-disabled={isReadOnly}
      autoComplete="tel-country-code"
      className={classNames(
        ComponentClassNames.CountryCodeSelect,
        ComponentClassNames.DialCodeSelect,
        className
      )}
      labelHidden={true}
      ref={ref}
      {...props}
    >
      {dialCodeOptions}
    </SelectField>
  );
};

export const CountryCodeSelect = React.forwardRef(DialCodeSelectPrimitive);

CountryCodeSelect.displayName = 'CountryCodeSelect';
