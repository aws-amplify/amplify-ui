import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { InternalIcon } from './types';

/**
 * @internal For internal Amplify UI use only. May be removed in a future release.
 */
export const IconAdd: InternalIcon = (props) => {
  const { className, ...rest } = props;

  return (
    <View
      as="span"
      width="1em"
      height="1em"
      className={classNames(ComponentClassNames.Icon, className)}
      {...rest}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
