import React, { FormEvent } from 'react';
import classNames from 'classnames';

import { View } from '../View';
import { SelectProps } from '../types';
import { ComponentClassNames } from '../shared';

export const Select: React.FC<SelectProps> = (props) => {
  const { className, children, placeholder, ...rest } = props;
  return (
    <View
      as="select"
      className={classNames(ComponentClassNames.Select, className)}
      {...rest}
    >
      {placeholder && (
        <option value="" disabled selected>
          {placeholder}
        </option>
      )}
      {children}
    </View>
  );
};
