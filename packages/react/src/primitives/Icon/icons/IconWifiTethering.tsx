import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconWifiTethering = (props) => {
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
          d="M12 11C10.9 11 10 11.9 10 13C10 14.1 10.9 15 12 15C13.1 15 14 14.1 14 13C14 11.9 13.1 11 12 11ZM18 13C18 9.69 15.31 7 12 7C8.69 7 6 9.69 6 13C6 15.22 7.21 17.15 9 18.19L10 16.45C8.81 15.75 8 14.48 8 13C8 10.79 9.79 9 12 9C14.21 9 16 10.79 16 13C16 14.48 15.19 15.75 14 16.45L15 18.19C16.79 17.15 18 15.22 18 13ZM12 3C6.48 3 2 7.48 2 13C2 16.7 4.01 19.92 6.99 21.65L7.99 19.92C5.61 18.53 4 15.96 4 13C4 8.58 7.58 5 12 5C16.42 5 20 8.58 20 13C20 15.96 18.39 18.53 16 19.92L17 21.65C19.99 19.92 22 16.7 22 13C22 7.48 17.52 3 12 3V3Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
