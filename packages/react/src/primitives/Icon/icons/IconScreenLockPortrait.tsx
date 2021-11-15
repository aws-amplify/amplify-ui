import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconScreenLockPortrait = (props) => {
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
          d="M10 16H14C14.55 16 15 15.55 15 15V12C15 11.45 14.55 11 14 11V10C14 8.89 13.1 8 12 8C10.89 8 10 8.9 10 10V11C9.45 11 9 11.45 9 12V15C9 15.55 9.45 16 10 16ZM10.8 10C10.8 9.34 11.34 8.8 12 8.8C12.66 8.8 13.2 9.34 13.2 10V11H10.8V10V10ZM17 1H7C5.9 1 5 1.9 5 3V21C5 22.1 5.9 23 7 23H17C18.1 23 19 22.1 19 21V3C19 1.9 18.1 1 17 1ZM17 19H7V5H17V19Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
