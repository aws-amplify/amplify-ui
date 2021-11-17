import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconFlipCameraAndroid = (props) => {
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
          d="M9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9C10.34 9 9 10.34 9 12ZM13 12C13 12.55 12.55 13 12 13C11.45 13 11 12.55 11 12C11 11.45 11.45 11 12 11C12.55 11 13 11.45 13 12Z"
          fill="currentColor"
        />
        <path
          d="M8 10V8H5.09C6.47 5.61 9.05 4 12 4C15.72 4 18.85 6.56 19.74 10H21.8C20.87 5.44 16.84 2 12 2C8.73 2 5.82 3.58 4 6.01V4H2V10H8Z"
          fill="black"
        />
        <path
          d="M16 14V16H18.91C17.53 18.39 14.95 20 12 20C8.27995 20 5.14995 17.44 4.25995 14H2.19995C3.12995 18.56 7.15995 22 12 22C15.27 22 18.18 20.42 20 17.99V20H22V14H16Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
