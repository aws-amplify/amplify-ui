import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconNetworkLocked = (props) => {
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
          d="M22 16V15.5C22 14.12 20.88 13 19.5 13C18.12 13 17 14.12 17 15.5V16C16.45 16 16 16.45 16 17V21C16 21.55 16.45 22 17 22H22C22.55 22 23 21.55 23 21V17C23 16.45 22.55 16 22 16ZM21 16H18V15.5C18 14.67 18.67 14 19.5 14C20.33 14 21 14.67 21 15.5V16ZM18 5.83V11.26C18.47 11.1 18.97 11 19.5 11C19.67 11 19.83 11.03 20 11.05V1L1 20H14V18H5.83L18 5.83Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
