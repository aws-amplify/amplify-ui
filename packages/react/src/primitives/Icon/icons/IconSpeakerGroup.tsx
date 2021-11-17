import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconSpeakerGroup = (props) => {
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
          d="M18.2 1H9.8C8.81 1 8 1.81 8 2.8V17.2C8 18.19 8.81 18.99 9.8 18.99L18.2 19C19.19 19 20 18.19 20 17.2V2.8C20 1.81 19.19 1 18.2 1V1ZM18 17L10 16.99V3H18V17ZM14 8C15.1 8 16 7.11 16 6C16 4.89 15.1 4 14 4C12.9 4 12 4.89 12 6C12 7.11 12.9 8 14 8ZM14 16C15.93 16 17.5 14.43 17.5 12.5C17.5 10.57 15.93 9 14 9C12.07 9 10.5 10.57 10.5 12.5C10.5 14.43 12.07 16 14 16ZM14 11C14.83 11 15.5 11.67 15.5 12.5C15.5 13.33 14.83 14 14 14C13.17 14 12.5 13.33 12.5 12.5C12.5 11.67 13.17 11 14 11ZM6 5H4V21C4 22.1 4.89 23 6 23H16V21H6V5Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
