import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconAmpStories = (props) => {
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
        <path d="M7 19H17V4H7V19ZM9 6H15V17H9V6Z" fill="currentColor" />
        <path d="M5 6H3V17H5V6Z" fill="black" />
        <path d="M21 6H19V17H21V6Z" fill="black" />
      </svg>
    </View>
  );
};
