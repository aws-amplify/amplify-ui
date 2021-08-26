import classNames from 'classnames';
import * as React from 'react';
import { ComponentClassNames } from '../shared/constants';
import { LabelProps } from '../types';
import { View } from '../View';

export const Label: React.FC<LabelProps> = ({
  children,
  htmlFor,
  visuallyHidden,
  ...rest
}) => {
  return (
    <View
      as="label"
      htmlFor={htmlFor}
      className={classNames(ComponentClassNames.Label, {
        'sr-only': visuallyHidden,
      })}
      {...rest}
    >
      {children}
    </View>
  );
};
