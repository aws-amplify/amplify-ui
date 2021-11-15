import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconViewAgenda = (props) => {
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
          d="M19 5V9H4V5H19ZM19 15V19H4V15H19ZM20 3H3C2.45 3 2 3.45 2 4V10C2 10.55 2.45 11 3 11H20C20.55 11 21 10.55 21 10V4C21 3.45 20.55 3 20 3ZM20 13H3C2.45 13 2 13.45 2 14V20C2 20.55 2.45 21 3 21H20C20.55 21 21 20.55 21 20V14C21 13.45 20.55 13 20 13Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
