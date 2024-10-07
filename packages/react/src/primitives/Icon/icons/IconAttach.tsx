import { classNames } from '@aws-amplify/ui';
import * as React from 'react';

import { ComponentClassName } from '@aws-amplify/ui';
import { InternalIcon } from './types';
import { View } from '../../View';

/**
 * @internal For internal Amplify UI use only. May be removed in a future release.
 */
export const IconAttach: InternalIcon = (props) => {
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
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.3928 1.93491L4.23565 11.8583C2.3257 13.7243 2.3257 16.7379 4.23565 18.6039C6.161 20.4849 9.29378 20.4849 11.2191 18.6039L21.2003 8.85257C22.3571 7.72235 22.3571 5.86149 21.2003 4.73128C20.0748 3.63171 18.2753 3.63857 17.1582 4.74668L7.17456 14.6503C6.86543 14.9523 6.8654 15.4303 7.17454 15.7323C7.49908 16.0494 8.03642 16.0494 8.36095 15.7323L18.338 5.98493L19.9926 7.67849L10.0155 17.4259C8.77102 18.6417 6.76446 18.6417 5.51997 17.4259C4.26127 16.1962 4.26007 14.1915 5.51637 12.9603L15.4908 3.06578C17.5259 1.04696 20.8044 1.03447 22.8548 3.03772C24.9625 5.09681 24.9625 8.48703 22.8548 10.5461L12.8737 20.2975C10.0284 23.0773 5.42639 23.0773 2.58108 20.2975C-0.279632 17.5026 -0.279632 12.9596 2.58108 10.1647L12.7383 0.241356L14.3928 1.93491Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
