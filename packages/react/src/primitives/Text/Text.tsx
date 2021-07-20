import classNames from 'classnames';
import React from 'react';
import { ComponentClassNames } from '../shared/constants';
import { TextProps } from '../types/text';
import { View } from '@aws-amplify/ui-react';

export const Text: React.FC<TextProps> = (props) => {
  const {
    as: asElementTag = 'p',
    className,
    children,
    id,
    isTruncated,
    variant,
    ...rest
  } = props;
  return (
    <View
      as={asElementTag}
      className={classNames(ComponentClassNames.Text, className)}
      data-variant={variant}
      data-truncate={isTruncated}
      id={id}
      {...rest}
    >
      {children}
    </View>
  );
};
