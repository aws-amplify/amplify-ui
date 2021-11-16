import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconLoyalty = (props) => {
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
          d="M21.41 11.58L12.41 2.58C12.05 2.22 11.55 2 11 2H4C2.9 2 2 2.9 2 4V11C2 11.55 2.22 12.05 2.59 12.42L11.59 21.42C11.95 21.78 12.45 22 13 22C13.55 22 14.05 21.78 14.41 21.41L21.41 14.41C21.78 14.05 22 13.55 22 13C22 12.45 21.77 11.94 21.41 11.58ZM13 20.01L4 11V4H11V3.99L20 12.99L13 20.01V20.01Z"
          fill="currentColor"
        />
        <path
          d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z"
          fill="black"
        />
        <path
          d="M8.9 12.55C8.9 13.12 9.13 13.62 9.5 14L13 17.5L16.5 14C16.87 13.63 17.1 13.11 17.1 12.55C17.1 11.42 16.18 10.5 15.05 10.5C14.48 10.5 13.97 10.73 13.6 11.1L13 11.7L12.4 11.11C12.03 10.73 11.51 10.5 10.95 10.5C9.82 10.5 8.9 11.42 8.9 12.55V12.55Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
