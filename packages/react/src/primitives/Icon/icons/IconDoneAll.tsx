import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconDoneAll = (props) => {
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
          d="M18 6.99984L16.59 5.58984L10.25 11.9298L11.66 13.3398L18 6.99984ZM22.24 5.58984L11.66 16.1698L7.48 11.9998L6.07 13.4098L11.66 18.9998L23.66 6.99984L22.24 5.58984ZM0.410004 13.4098L6 18.9998L7.41 17.5898L1.83 11.9998L0.410004 13.4098Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
