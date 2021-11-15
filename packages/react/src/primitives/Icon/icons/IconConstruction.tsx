import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconConstruction = (props) => {
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
          d="M15.904 13.0506L13.7827 15.1719L19.7789 21.1681L21.9002 19.0468L15.904 13.0506Z"
          fill="currentColor"
        />
        <path
          d="M17.5001 10C19.4301 10 21.0001 8.43005 21.0001 6.50005C21.0001 5.92005 20.8401 5.38005 20.5901 4.90005L17.8901 7.60005L16.4001 6.11005L19.1001 3.41005C18.6201 3.16005 18.0801 3.00005 17.5001 3.00005C15.5701 3.00005 14.0001 4.57005 14.0001 6.50005C14.0001 6.91005 14.0801 7.30005 14.2101 7.66005L12.3601 9.51005L10.5801 7.73005L11.2901 7.02005L9.8801 5.61005L12.0001 3.49005C10.8301 2.32005 8.9301 2.32005 7.7601 3.49005L4.2201 7.03005L5.6301 8.44005H2.8101L2.1001 9.15005L5.6401 12.69L6.3501 11.98V9.15005L7.7601 10.56L8.4701 9.85005L10.2501 11.63L2.8401 19.0401L4.9601 21.16L16.3401 9.79005C16.7001 9.92005 17.0901 10 17.5001 10Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
