import * as React from 'react';
import { classNames } from '@aws-amplify/ui';

import { ComponentClassName } from '@aws-amplify/ui';
import { View } from '../../View';
import type { InternalIcon } from './types';

/**
 * @internal For internal Amplify UI use only. May be removed in a future release.
 */
export const IconCheckCircleFill: InternalIcon = (props) => {
  const { className, ...rest } = props;

  return (
    <View
      as="span"
      width="1em"
      height="1em"
      className={classNames(ComponentClassName.Icon, className)}
      {...rest}
    >
      <svg
        width="54"
        height="54"
        viewBox="0 0 54 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22.9333 38.9333L41.7333 20.1333L38 16.4L22.9333 31.4667L15.3333 23.8667L11.6 27.6L22.9333 38.9333ZM26.6667 53.3333C22.9778 53.3333 19.5111 52.6333 16.2667 51.2333C13.0222 49.8333 10.2 47.9333 7.8 45.5333C5.4 43.1333 3.5 40.3111 2.1 37.0667C0.7 33.8222 0 30.3556 0 26.6667C0 22.9778 0.7 19.5111 2.1 16.2667C3.5 13.0222 5.4 10.2 7.8 7.8C10.2 5.4 13.0222 3.5 16.2667 2.1C19.5111 0.7 22.9778 0 26.6667 0C30.3556 0 33.8222 0.7 37.0667 2.1C40.3111 3.5 43.1333 5.4 45.5333 7.8C47.9333 10.2 49.8333 13.0222 51.2333 16.2667C52.6333 19.5111 53.3333 22.9778 53.3333 26.6667C53.3333 30.3556 52.6333 33.8222 51.2333 37.0667C49.8333 40.3111 47.9333 43.1333 45.5333 45.5333C43.1333 47.9333 40.3111 49.8333 37.0667 51.2333C33.8222 52.6333 30.3556 53.3333 26.6667 53.3333Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
