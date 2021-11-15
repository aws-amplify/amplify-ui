import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconVoiceOverOff = (props) => {
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
          d="M16.76 5.36L15.08 7.05C15.88 8.18 15.91 9.63 15.17 10.79L16.87 12.49C18.77 10.47 18.74 7.51 16.76 5.36ZM20.07 2L18.44 3.63C21.16 6.6 21.2 11.02 18.58 14.19L20.22 15.83C23.96 11.94 23.93 5.99 20.07 2V2ZM9.43 5.04L12.96 8.57C12.76 6.71 11.29 5.24 9.43 5.04V5.04ZM4.41 2.86L3 4.27L5.62 6.89C5.23 7.5 5 8.22 5 9C5 11.21 6.79 13 9 13C9.78 13 10.5 12.77 11.11 12.38L15.51 16.78C13.74 15.6 10.78 15 9 15C6.33 15 1 16.34 1 19V21H17V19C17 18.63 16.89 18.3 16.71 17.98L19.73 21L21.14 19.59L4.41 2.86ZM3 19C3.22 18.28 6.31 17 9 17C11.7 17 14.8 18.29 15 19H3ZM9 11C7.9 11 7 10.1 7 9C7 8.78 7.04 8.58 7.11 8.38L9.62 10.89C9.42 10.96 9.22 11 9 11V11Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
