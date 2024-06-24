import * as React from 'react';
import { iconClasses } from '@aws-amplify/ui';

import { View } from '../../View';
import { InternalIcon } from './types';

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
      className={iconClasses(undefined, [className])}
      {...rest}
    ></View>
  );
};
