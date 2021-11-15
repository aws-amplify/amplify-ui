import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconChildFriendly = (props) => {
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
          d="M13 2V10H21C21 5.58 17.42 2 13 2ZM15 8V4.34C16.7 4.94 18.05 6.29 18.66 8H15ZM6.44 11L5.49 9H2V11H4.22C4.22 11 6.11 15.07 6.34 15.42C5.24 16.01 4.5 17.17 4.5 18.5C4.5 20.43 6.07 22 8 22C9.76 22 11.22 20.7 11.46 19H13.54C13.78 20.7 15.24 22 17 22C18.93 22 20.5 20.43 20.5 18.5C20.5 17.46 20.04 16.53 19.32 15.89C20.37 14.54 21 12.84 21 11H6.44V11ZM8 20C7.17 20 6.5 19.33 6.5 18.5C6.5 17.67 7.17 17 8 17C8.83 17 9.5 17.67 9.5 18.5C9.5 19.33 8.83 20 8 20ZM17 20C16.17 20 15.5 19.33 15.5 18.5C15.5 17.67 16.17 17 17 17C17.83 17 18.5 17.67 18.5 18.5C18.5 19.33 17.83 20 17 20ZM17.74 14.66L17.45 15.03C17.31 15.01 17.15 15 17 15C15.61 15 14.4 15.82 13.84 17H11.16C10.66 15.96 9.66 15.2 8.48 15.03L8.04 14.36C7.94 14.19 7.7 13.67 7.37 13H18.66C18.45 13.59 18.14 14.15 17.74 14.66Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
