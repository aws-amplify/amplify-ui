import { classNames } from '@aws-amplify/ui';
import * as React from 'react';

import { ComponentClassName } from '@aws-amplify/ui';
import { View } from '../../View';
import type { InternalIcon } from './types';

/**
 * @internal For internal Amplify UI use only. May be removed in a future release.
 */
export const IconCheckCircleOutline: InternalIcon = (props) => {
  const { className, ...rest } = props;

  return (
    <View
      as="span"
      width="1em"
      height="1em"
      className={classNames(ComponentClassName.Icon, className)}
      {...rest}
    ></View>
  );
};
