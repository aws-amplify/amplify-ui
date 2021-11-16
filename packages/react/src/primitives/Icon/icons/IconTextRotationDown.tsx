import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconTextRotationDown = (props) => {
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
          d="M6 20L9 17H7V4H5V17H3L6 20ZM12.2 8.5V13.5L10 14.4V16.5L21 11.75V10.25L10 5.5V7.6L12.2 8.5ZM19.02 11L14 12.87V9.13L19.02 11Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
