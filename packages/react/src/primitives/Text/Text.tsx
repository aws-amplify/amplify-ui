import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { TextProps, Primitive } from '../types';
import { View } from '../View';

export const Text: Primitive<TextProps, 'p'> = ({
  as = 'p',
  className,
  children,
  isTruncated,
  variation,
  ...rest
}) => (
  <View
    as={as}
    className={classNames(ComponentClassNames.Text, className)}
    data-truncate={isTruncated}
    data-variation={variation}
    {...rest}
  >
    {children}
  </View>
);

Text.displayName = 'Text';
