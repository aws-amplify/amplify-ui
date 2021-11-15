import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconWhatshot = (props) => {
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
          d="M11.57 13.1599C10.21 13.4399 9.4 14.3199 9.4 15.5699C9.4 16.9099 10.51 17.9899 11.89 17.9899C13.94 17.9899 15.6 16.3299 15.6 14.2799C15.6 13.2099 15.45 12.1599 15.14 11.1599C14.35 12.2299 12.94 12.8799 11.57 13.1599ZM13.5 0.669922C13.5 0.669922 14.24 3.31992 14.24 5.46992C14.24 7.52992 12.89 9.19992 10.83 9.19992C8.76 9.19992 7.2 7.52992 7.2 5.46992L7.23 5.10992C5.21 7.50992 4 10.6199 4 13.9999C4 18.4199 7.58 21.9999 12 21.9999C16.42 21.9999 20 18.4199 20 13.9999C20 8.60992 17.41 3.79992 13.5 0.669922ZM12 19.9999C8.69 19.9999 6 17.3099 6 13.9999C6 12.4699 6.3 10.9599 6.86 9.56992C7.87 10.5799 9.27 11.1999 10.83 11.1999C13.49 11.1999 15.58 9.36992 16.11 6.76992C17.34 8.96992 18 11.4399 18 13.9999C18 17.3099 15.31 19.9999 12 19.9999Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
