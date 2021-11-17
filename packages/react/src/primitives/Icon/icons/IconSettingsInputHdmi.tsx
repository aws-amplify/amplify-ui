import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconSettingsInputHdmi = (props) => {
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
          d="M18 7V4C18 2.9 17.1 2 16 2H8C6.9 2 6 2.9 6 4V7H5V13L8 19V22H16V19L19 13V7H18ZM8 4H16V7H13.99V5H12.99V7H11V5H10V7H8V4ZM17 12.53L14 18.53V20H10V18.53L7 12.53V9H17V12.53Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
