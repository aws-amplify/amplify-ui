import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconCommute = (props) => {
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
          d="M12 4H5C3.34 4 2 5.34 2 7V15C2 16.66 3.34 18 5 18L4 19V20H5L7 18H9V13H4V6H13V8H15V7C15 5.34 13.66 4 12 4ZM5 14C5.55 14 6 14.45 6 15C6 15.55 5.55 16 5 16C4.45 16 4 15.55 4 15C4 14.45 4.45 14 5 14ZM20.57 9.66C20.43 9.26 20.05 9 19.6 9H12.41C11.95 9 11.58 9.26 11.43 9.66L10.01 13.77V19.28C10.01 19.66 10.32 20 10.7 20H11.32C11.7 20 12 19.62 12 19.24V18H20V19.24C20 19.62 20.31 20 20.69 20H21.3C21.68 20 21.99 19.66 21.99 19.28L22 17.91V13.77L20.57 9.66V9.66ZM12.41 10H19.6L20.63 13H11.38L12.41 10V10ZM12 16C11.45 16 11 15.55 11 15C11 14.45 11.45 14 12 14C12.55 14 13 14.45 13 15C13 15.55 12.55 16 12 16ZM20 16C19.45 16 19 15.55 19 15C19 14.45 19.45 14 20 14C20.55 14 21 14.45 21 15C21 15.55 20.55 16 20 16Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
