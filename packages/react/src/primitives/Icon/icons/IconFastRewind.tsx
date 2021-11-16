import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconFastRewind = (props) => {
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
          d="M18 9.86V14.14L14.97 12L18 9.86ZM9 9.86V14.14L5.97 12L9 9.86ZM20 6L11.5 12L20 18V6ZM11 6L2.5 12L11 18V6Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
