import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconStopScreenShare = (props) => {
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
          d="M21.79 17.9998L23.79 19.9998H24V17.9998H21.79ZM1.11 2.97982L2.66 4.53982C2.25 4.90982 2 5.42982 2 6.01982V15.9998C2 17.0998 2.9 17.9998 4.01 17.9998H0V19.9998H18.13L20.84 22.7098L22.25 21.2998L2.52 1.56982L1.11 2.97982ZM4 6.01982H4.13L9.08 10.9498C7.94 12.0698 7.31 13.5198 7 14.9998C7.96 13.7098 9.13 12.9198 10.67 12.5398L14.13 16.0198H4V6.01982ZM20 6.01982V16.2098L21.3 17.5098C21.72 17.1398 22 16.6198 22 16.0198V6.01982C22 4.90982 21.1 4.01982 20 4.01982H7.8L9.8 6.01982H20V6.01982ZM12.93 9.14982L15.72 11.9298L17 10.7298L13 6.99982V9.12982L12.93 9.14982Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
