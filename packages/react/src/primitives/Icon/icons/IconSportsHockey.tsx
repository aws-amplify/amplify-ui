import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconSportsHockey = (props) => {
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
        <path d="M2 17V20H4V16H3C2.45 16 2 16.45 2 17Z" fill="currentColor" />
        <path
          d="M9 16.0001H5V20.0001L9.69 19.9901C10.07 19.9901 10.41 19.7801 10.58 19.4401L11.45 17.5401L9.86 14.0601L9 16.0001Z"
          fill="black"
        />
        <path
          d="M21.71 16.29C21.53 16.11 21.28 16 21 16H20V20H22V17C22 16.72 21.89 16.47 21.71 16.29Z"
          fill="black"
        />
        <path
          d="M13.6001 12.84L17.6501 4H14.3001L12.5401 7.97L12.0501 9.07L12.0001 9.21L9.7001 4H6.3501L10.4001 12.84L11.9201 16.16L12.0001 16.34L13.4201 19.44C13.5901 19.78 13.9301 19.99 14.3101 19.99L19.0001 20V16H15.0001L13.6001 12.84Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
