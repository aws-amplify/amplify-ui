import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { LabelProps, Primitive } from '../types';
import { View } from '../View';

export const Label: Primitive<LabelProps, 'label'> = ({
  children,
  className,
  visuallyHidden,
  ...rest
}) => {
  return (
    <View
      as="label"
      className={classNames(ComponentClassNames.Label, className, {
        'sr-only': visuallyHidden,
      })}
      {...rest}
    >
      {children}
    </View>
  );
};

Label.displayName = 'Label';
