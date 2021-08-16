import classNames from 'classnames';
import * as React from 'react';
import { ComponentClassNames } from '../shared/constants';
import { TextProps } from '../types/text';
import { View } from '../View';

export const Text: React.FC<TextProps> = (props) => {
  const {
    as: asElementTag = 'p',
    className,
    children,
    id,
    isTruncated,
    variation,
    ...rest
  } = props;
  return (
    <View
      as={asElementTag}
      className={classNames(ComponentClassNames.Text, className)}
      data-truncate={isTruncated}
      data-variation={variation}
      id={id}
      {...rest}
    >
      {children}
    </View>
  );
};
