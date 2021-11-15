import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconTouchApp = (props) => {
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
          d="M18.19 12.44L14.95 10.82C16.24 9.82 17.07 8.26 17.07 6.5C17.07 3.47 14.6 1 11.57 1C8.54 1 6.07 3.47 6.07 6.5C6.07 8.63 7.29 10.48 9.07 11.39V14.65C6.92 14.19 7.05 14.21 6.81 14.21C6.28 14.21 5.78 14.42 5.4 14.8L4 16.22L9.09 21.31C9.52 21.75 10.12 22 10.74 22H17.04C18.02 22 18.85 21.3 19.01 20.33L19.81 15.62C20.03 14.32 19.38 13.04 18.19 12.44ZM17.84 15.29L17.04 20H10.74C10.65 20 10.57 19.96 10.5 19.9L6.82 16.22L11.07 17.11V6.5C11.07 6.22 11.29 6 11.57 6C11.85 6 12.07 6.22 12.07 6.5V12.5H13.83L17.29 14.23C17.69 14.43 17.91 14.86 17.84 15.29ZM8.07 6.5C8.07 4.57 9.64 3 11.57 3C13.5 3 15.07 4.57 15.07 6.5C15.07 7.45 14.69 8.31 14.07 8.94V6.5C14.07 5.12 12.95 4 11.57 4C10.19 4 9.07 5.12 9.07 6.5V8.94C8.45 8.31 8.07 7.45 8.07 6.5Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
