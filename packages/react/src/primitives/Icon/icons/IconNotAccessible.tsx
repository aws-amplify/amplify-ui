import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconNotAccessible = (props) => {
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
          d="M10 4C10 2.9 10.9 2 12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4ZM19 13V11C17.46 11.02 15.91 10.25 14.93 9.17L13.64 7.74C13.4 7.5 13.2 7.38 13.01 7.28C12.65 7.09 12.29 6.98 11.81 7.02C11.32 7.06 10.9 7.29 10.58 7.63L14 11.05C15.29 12.12 17.25 12.99 19 13ZM10 20C8.34001 20 7.00001 18.66 7.00001 17C7.00001 15.69 7.84001 14.59 9.00001 14.17V12.1C6.72001 12.56 5.00001 14.58 5.00001 17C5.00001 19.76 7.24001 22 10 22C12.42 22 14.44 20.28 14.9 18H12.83C12.42 19.16 11.31 20 10 20ZM2.81001 2.81L1.39001 4.22L10 12.83V15C10 16.1 10.9 17 12 17H14.17L19.78 22.61L21.19 21.2L2.81001 2.81Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
