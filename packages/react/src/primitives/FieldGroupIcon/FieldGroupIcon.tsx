import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { FieldGroupIconProps, Primitive } from '../types';
import { View } from '../View';

export const FieldGroupIcon: Primitive<FieldGroupIconProps, 'button'> = ({
  className,
  children,
  isVisible = true,
  excludeFromTabOrder = false,
  ...rest
}) => {
  return isVisible ? (
    <View
      className={classNames(ComponentClassNames.FieldGroupIcon, className)}
      tabIndex={excludeFromTabOrder ? -1 : undefined}
      {...rest}
    >
      {children}
    </View>
  ) : null;
};
