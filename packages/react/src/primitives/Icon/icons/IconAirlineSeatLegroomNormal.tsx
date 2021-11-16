import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconAirlineSeatLegroomNormal = (props) => {
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
          d="M5 12V3H3V12C3 14.76 5.24 17 8 17H14V15H8C6.34 15 5 13.66 5 12ZM20.5 18H19V11C19 9.9 18.1 9 17 9H12V3H6V11C6 12.65 7.35 14 9 14H16V21H20.5C21.33 21 22 20.33 22 19.5C22 18.67 21.33 18 20.5 18Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
