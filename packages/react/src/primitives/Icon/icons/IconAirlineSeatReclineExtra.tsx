import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconAirlineSeatReclineExtra = (props) => {
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
          d="M5.35 5.64011C4.45 5.00011 4.23 3.76011 4.86 2.85011C5.49 1.95011 6.74 1.73011 7.65 2.36011C8.55 3.00011 8.77 4.24011 8.14 5.15011C7.5 6.05011 6.26 6.27011 5.35 5.64011V5.64011ZM16 19.0001H8.93C7.45 19.0001 6.19 17.9201 5.97 16.4601L4 7.00011H2L3.99 16.7601C4.37 19.2001 6.47 21.0001 8.94 21.0001H16V19.0001ZM16.23 15.0001H11.35L10.32 10.9001C11.9 11.7901 13.6 12.4401 15.47 12.1201V9.99011C13.84 10.3001 12.03 9.72011 10.78 8.74011L9.14 7.47011C8.91 7.29011 8.65 7.17011 8.38 7.09011C8.06 7.00011 7.72 6.97011 7.39 7.03011H7.37C6.14 7.25011 5.32 8.42011 5.53 9.64011L6.88 15.5601C7.16 16.9801 8.39 18.0001 9.83 18.0001H16.68L20.5 21.0001L22 19.5001L16.23 15.0001Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
