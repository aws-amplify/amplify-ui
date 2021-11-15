import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconTextRotateVertical = (props) => {
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
          d="M15.75 5H14.25L9.5 16H11.6L12.5 13.8H17.5L18.4 16H20.5L15.75 5ZM13.13 12L15 6.98L16.87 12H13.13V12ZM6 20L9 17H7V4H5V17H3L6 20Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
