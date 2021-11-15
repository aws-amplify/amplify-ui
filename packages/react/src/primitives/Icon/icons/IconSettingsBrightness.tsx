import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconSettingsBrightness = (props) => {
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
          d="M21 3H3C1.9 3 1 3.9 1 5V19C1 20.1 1.9 21 3 21H21C22.1 21 23 20.1 23 19V5C23 3.9 22.1 3 21 3ZM21 19.01H3V4.99H21V19.01V19.01ZM8 16H10.5L12 17.5L13.5 16H16V13.5L17.5 12L16 10.5V8H13.5L12 6.5L10.5 8H8V10.5L6.5 12L8 13.5V16ZM12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15V9Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
