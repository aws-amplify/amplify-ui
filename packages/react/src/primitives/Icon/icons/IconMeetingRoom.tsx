import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconMeetingRoom = (props) => {
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
          d="M19 19V4H15V3H5V19H3V21H15V6H17V21H21V19H19ZM13 19H7V5H13V19ZM10 11H12V13H10V11Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
