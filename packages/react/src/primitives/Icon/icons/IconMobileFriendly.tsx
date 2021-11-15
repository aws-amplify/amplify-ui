import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconMobileFriendly = (props) => {
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
          d="M19 1H9C7.9 1 7 1.9 7 3V6H9V4H19V20H9V18H7V21C7 22.1 7.9 23 9 23H19C20.1 23 21 22.1 21 21V3C21 1.9 20.1 1 19 1ZM7.01 13.47L4.46 10.92L3.19 12.19L7 16L14.19 8.81L12.92 7.54L7.01 13.47V13.47Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
