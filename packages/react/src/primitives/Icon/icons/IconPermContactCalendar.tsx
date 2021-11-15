import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconPermContactCalendar = (props) => {
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
          d="M20.84 4.22C20.79 4.1 20.73 3.99 20.66 3.88C20.52 3.67 20.33 3.48 20.12 3.34C20.01 3.27 19.9 3.21 19.78 3.16C19.54 3.06 19.28 3 19 3H18V1H16V3H8V1H6V3H5C4.58 3 4.2 3.13 3.88 3.34C3.67 3.48 3.48 3.67 3.34 3.88C3.27 3.99 3.21 4.1 3.16 4.22C3.06 4.46 3 4.72 3 5V19C3 20.1 3.89 21 5 21H19C19.28 21 19.54 20.94 19.78 20.84C19.9 20.79 20.01 20.73 20.12 20.66C20.33 20.52 20.52 20.33 20.66 20.12C20.87 19.8 21 19.41 21 19V5C21 4.72 20.94 4.46 20.84 4.22ZM5 19V5H19V19H5ZM12 12.88C9.97 12.88 6 13.96 6 16.46V18H18V16.47C18 13.96 14.03 12.88 12 12.88ZM8.31 16C9 15.44 10.69 14.88 12 14.88C13.31 14.88 15.01 15.44 15.69 16H8.31ZM12 12C13.65 12 15 10.65 15 9C15 7.35 13.65 6 12 6C10.35 6 9 7.35 9 9C9 10.65 10.35 12 12 12ZM12 8C12.55 8 13 8.45 13 9C13 9.55 12.55 10 12 10C11.45 10 11 9.55 11 9C11 8.45 11.45 8 12 8Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
