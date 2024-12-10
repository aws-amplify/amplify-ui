import { classNames } from '@aws-amplify/ui';
import * as React from 'react';

import { ComponentClassName } from '@aws-amplify/ui';
import { InternalIcon } from './types';
import { View } from '../../View';

/**
 * @internal For internal Amplify UI use only. May be removed in a future release.
 */
export const IconAssistant: InternalIcon = (props) => {
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
          d="M13.8548 1.40981C12.693 0.801759 11.3069 0.801759 10.1451 1.40981L2.14518 5.59679C0.826447 6.28698 0 7.65232 0 9.14075V16.8593C0 18.3477 0.826447 19.713 2.14518 20.4032L10.1451 24.5902C11.3069 25.1982 12.693 25.1982 13.8548 24.5902L21.8547 20.4032C23.1735 19.713 23.9999 18.3477 23.9999 16.8592V9.14075C23.9999 7.65232 23.1735 6.28698 21.8547 5.59679L13.8548 1.40981ZM12.9258 6.05676C12.5872 5.22732 11.4127 5.22732 11.0741 6.05676L9.42869 10.0877C9.31871 10.3572 9.0968 10.5653 8.82088 10.6579L4.665 12.0519C3.7557 12.3569 3.7557 13.6431 4.665 13.9481L8.82088 15.3421C9.0968 15.4347 9.31871 15.6428 9.42869 15.9123L11.0741 19.9432C11.4127 20.7727 12.5872 20.7727 12.9258 19.9432L14.5712 15.9123C14.6812 15.6428 14.9031 15.4347 15.179 15.3421L19.3349 13.9481C20.2442 13.6431 20.2442 12.3569 19.3349 12.0519L15.179 10.6579C14.9031 10.5653 14.6812 10.3572 14.5712 10.0877L12.9258 6.05676Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
