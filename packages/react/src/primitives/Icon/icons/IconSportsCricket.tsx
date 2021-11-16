import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconSportsCricket = (props) => {
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
          d="M15.0401 12.79L6.54006 4.29C6.35006 4.1 6.09006 4 5.83006 4C5.57006 4 5.32006 4.1 5.13006 4.29L2.29006 7.13C1.90006 7.52 1.90006 8.16 2.29006 8.55L10.7901 17.05C10.9901 17.25 11.2401 17.34 11.5001 17.34C11.7601 17.34 12.0101 17.24 12.2101 17.05L15.0401 14.22C15.4301 13.82 15.4301 13.18 15.0401 12.79ZM11.5001 14.92L4.41006 7.83L5.83006 6.41L12.9201 13.5L11.5001 14.92Z"
          fill="currentColor"
        />
        <path
          d="M15.7555 16.3421L14.3413 17.7563L18.5839 21.9989L19.9981 20.5847L15.7555 16.3421Z"
          fill="black"
        />
        <path
          d="M18.5 2C16.57 2 15 3.57 15 5.5C15 7.43 16.57 9 18.5 9C20.43 9 22 7.43 22 5.5C22 3.57 20.43 2 18.5 2ZM18.5 7C17.67 7 17 6.33 17 5.5C17 4.67 17.67 4 18.5 4C19.33 4 20 4.67 20 5.5C20 6.33 19.33 7 18.5 7Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
