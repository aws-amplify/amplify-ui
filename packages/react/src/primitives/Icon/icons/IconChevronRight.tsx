import classNames from 'classnames';
import * as React from 'react';

import { ComponentClassNames } from '../../shared';
import { InternalIcon } from './types';
import { View } from '../../View';

/**
 * @internal For internal Amplify UI use only. May be removed in a future release.
 */
export const IconChevronRight: InternalIcon = (props) => {
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
          d="M9.99984 6L8.58984 7.41L13.1698 12L8.58984 16.59L9.99984 18L15.9998 12L9.99984 6Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
