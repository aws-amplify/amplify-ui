import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconPinDrop = (props) => {
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
          d="M12 4C13.93 4 17 5.4 17 9.15C17 11.31 15.28 13.82 12 16.47C8.72 13.82 7 11.3 7 9.15C7 5.4 10.07 4 12 4ZM12 2C8.73 2 5 4.46 5 9.15C5 12.27 7.33 15.56 12 19C16.67 15.56 19 12.27 19 9.15C19 4.46 15.27 2 12 2Z"
          fill="currentColor"
        />
        <path
          d="M12 7C10.9 7 10 7.9 10 9C10 10.1 10.9 11 12 11C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9C14 8.46957 13.7893 7.96086 13.4142 7.58579C13.0391 7.21071 12.5304 7 12 7V7ZM5 20H19V22H5V20Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
