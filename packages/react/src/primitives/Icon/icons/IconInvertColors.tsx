import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconInvertColors = (props) => {
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
          d="M17.66 7.93002L12 2.27002L6.34 7.93002C3.22 11.05 3.22 16.12 6.34 19.24C7.9 20.8 9.95 21.58 12 21.58C14.05 21.58 16.1 20.8 17.66 19.24C20.78 16.12 20.78 11.05 17.66 7.93002V7.93002ZM12 19.59C10.4 19.59 8.89 18.97 7.76 17.83C6.62 16.69 6 15.19 6 13.59C6 11.99 6.62 10.48 7.76 9.35002L12 5.10002V19.59Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
