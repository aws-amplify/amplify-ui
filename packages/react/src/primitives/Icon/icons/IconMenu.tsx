import classNames from 'classnames';
import * as React from 'react';

import { ComponentClassNames } from '../../shared';
import { InternalIcon } from './types';
import { View } from '../../View';

/**
 * @internal For internal Amplify UI use only. May be removed in a future release.
 */
export const IconMenu: InternalIcon = (props) => {
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
          d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
