import { classNames } from '@aws-amplify/ui';
import * as React from 'react';

import { ComponentClassName } from '@aws-amplify/ui';
import { InternalIcon } from './types';
import { View } from '../../View';

/**
 * @internal For internal Amplify UI use only. May be removed in a future release.
 */
export const IconSend: InternalIcon = (props) => {
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
          d="M1.34374 0.774436C1.72319 0.451324 2.26162 0.393083 2.70138 0.627584L23.173 11.544C23.5704 11.7559 23.8177 12.1704 23.8155 12.6207C23.8133 13.071 23.5618 13.4831 23.1624 13.691L2.69073 24.3477C2.24914 24.5776 1.71196 24.5144 1.33575 24.1884C0.959534 23.8624 0.820634 23.3396 0.98539 22.8698L4.58366 12.6099L0.982433 2.09133C0.821002 1.61982 0.964295 1.09755 1.34374 0.774436ZM6.72819 13.8281L4.29043 20.779L17.6432 13.8281H6.72819ZM17.7477 11.4013H6.735L4.27542 4.21725L17.7477 11.4013Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
