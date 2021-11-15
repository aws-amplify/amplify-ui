import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconCallEnd = (props) => {
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
          d="M18.59 10.52C19.64 11.03 20.63 11.67 21.55 12.43L20.48 13.5C19.9 13.03 19.27 12.61 18.6 12.23V10.52H18.59ZM5.4 10.52V12.22C4.75 12.59 4.12 13.01 3.53 13.49L2.46 12.42C3.37 11.67 4.36 11.04 5.4 10.52V10.52ZM12 7C7.46 7 3.34 8.78 0.29 11.67C0.11 11.85 0 12.1 0 12.38C0 12.66 0.11 12.91 0.29 13.08L2.77 15.56C2.95 15.74 3.2 15.85 3.48 15.85C3.75 15.85 4 15.75 4.18 15.57C4.97 14.84 5.86 14.21 6.84 13.72C7.17 13.56 7.4 13.21 7.4 12.82V9.72C8.85 9.25 10.4 9 12 9C13.6 9 15.15 9.25 16.59 9.73V12.83C16.59 13.23 16.82 13.57 17.15 13.73C18.13 14.22 19.03 14.84 19.82 15.58C20 15.75 20.25 15.86 20.52 15.86C20.8 15.86 21.05 15.75 21.23 15.57L23.71 13.09C23.89 12.91 24 12.66 24 12.38C24 12.1 23.89 11.85 23.71 11.67C20.66 8.78 16.54 7 12 7Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
