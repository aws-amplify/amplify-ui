import classNames from 'classnames';
import * as React from 'react';

import { ComponentClassNames } from '../../shared';
import { InternalIcon } from './types';
import { View } from '../../View';

/**
 * @internal For internal Amplify UI use only. May be removed in a future release.
 */
export const IconVisibilityOff: InternalIcon = (props) => {
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
          d="M12 6.0002C15.79 6.0002 19.17 8.1302 20.82 11.5002C20.23 12.7202 19.4 13.7702 18.41 14.6202L19.82 16.0302C21.21 14.8002 22.31 13.2602 23 11.5002C21.27 7.1102 17 4.0002 12 4.0002C10.73 4.0002 9.51 4.2002 8.36 4.5702L10.01 6.2202C10.66 6.0902 11.32 6.0002 12 6.0002ZM10.93 7.14019L13 9.2102C13.57 9.4602 14.03 9.9202 14.28 10.4902L16.35 12.5602C16.43 12.2202 16.49 11.8602 16.49 11.4902C16.5 9.0102 14.48 7.0002 12 7.0002C11.63 7.0002 11.28 7.05019 10.93 7.14019ZM2.01 3.8702L4.69 6.5502C3.06 7.8302 1.77 9.5302 1 11.5002C2.73 15.8902 7 19.0002 12 19.0002C13.52 19.0002 14.98 18.7102 16.32 18.1802L19.74 21.6002L21.15 20.1902L3.42 2.4502L2.01 3.8702ZM9.51 11.3702L12.12 13.9802C12.08 13.9902 12.04 14.0002 12 14.0002C10.62 14.0002 9.5 12.8802 9.5 11.5002C9.5 11.4502 9.51 11.4202 9.51 11.3702V11.3702ZM6.11 7.97019L7.86 9.7202C7.63 10.2702 7.5 10.8702 7.5 11.5002C7.5 13.9802 9.52 16.0002 12 16.0002C12.63 16.0002 13.23 15.8702 13.77 15.6402L14.75 16.6202C13.87 16.8602 12.95 17.0002 12 17.0002C8.21 17.0002 4.83 14.8702 3.18 11.5002C3.88 10.0702 4.9 8.89019 6.11 7.97019Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
