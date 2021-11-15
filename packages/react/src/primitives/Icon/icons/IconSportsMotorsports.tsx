import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconSportsMotorsports = (props) => {
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
          d="M21.96 11.22C21.57 7.01 17.76 4 13.56 4C13.37 4 13.18 4.01 12.99 4.02C2 4.74 2 17.2 2 17.2V18C2 19.1 2.9 20 4 20H14C18.67 20 22.41 15.99 21.96 11.22ZM5.26 11.56C5.83 10.27 6.54 9.21 7.4 8.37L11.02 9.9C11.62 10.15 12 10.73 12 11.38C12 12.27 11.28 12.99 10.39 12.99H4.72C4.87 12.53 5.04 12.05 5.26 11.56ZM18.44 16.04C17.3 17.29 15.68 18 14 18H4V17.2C4 17.18 4.01 16.28 4.24 15H10.39C12.38 15 14 13.38 14 11.39C14 9.94 13.13 8.63 11.8 8.07L9.3 7.01C10.4 6.44 11.67 6.11 13.12 6.02C13.27 6 13.42 6 13.56 6C16.87 6 19.69 8.37 19.97 11.41C20.13 13.13 19.59 14.77 18.44 16.04Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
