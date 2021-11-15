import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconCalendarViewDay = (props) => {
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
          d="M3 17H21V19H3V17ZM19 12V13H5V12H19ZM21 10H3V15H21V10ZM3 6H21V8H3V6Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
