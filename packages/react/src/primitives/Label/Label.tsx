import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { LabelProps, Primitive } from '../types';
import { View } from '../View';

export const Label: Primitive<LabelProps, 'label'> = ({
  children,
  visuallyHidden,
  ...rest
}) => {
  return (
    <View
      as="label"
      className={classNames(ComponentClassNames.Label, {
        'sr-only': visuallyHidden,
      })}
      {...rest}
    >
      {children}
    </View>
  );
};
