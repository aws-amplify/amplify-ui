import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconBatteryChargingFull = (props) => {
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
          d="M15.67 4H14V2H10V4H8.33C7.6 4 7 4.6 7 5.33V20.66C7 21.4 7.6 22 8.33 22H15.66C16.4 22 17 21.4 17 20.67V5.33C17 4.6 16.4 4 15.67 4ZM11 20V14.5H9L13 7V12.5H15L11 20Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
