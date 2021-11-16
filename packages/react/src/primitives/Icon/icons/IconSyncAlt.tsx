import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconSyncAlt = (props) => {
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
        <path d="M22 8L18 4V7H3V9H18V12L22 8Z" fill="currentColor" />
        <path d="M2 16L6 20V17H21V15H6V12L2 16Z" fill="black" />
      </svg>
    </View>
  );
};
