import classNames from 'classnames';
import React from 'react';
import { ComponentClassNames } from '../shared/constants';
import { TextProps } from '../types/text';
import { View } from '@aws-amplify/ui-react';

export const Text: React.FC<TextProps> = (props) => {
  const { className, children, id, isTruncated, variant, ...rest } = props;
  return (
    <View
      as="p"
      className={classNames(ComponentClassNames.Text, className)}
      data-truncate={isTruncated}
      data-variant={variant}
      id={id}
      {...rest}
    >
      {children}
    </View>
  );
};
