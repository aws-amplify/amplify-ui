import classNames from 'classnames';
import * as React from 'react';

import { ComponentClassNames } from '../../shared';
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
      className={classNames(ComponentClassNames.Icon, className)}
      {...rest}
    ></View>
  );
};
