import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconForwardToInbox = (props) => {
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
          d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H13V18H4V8L12 13L20 8V13H22V6C22 4.9 21.1 4 20 4ZM12 11L4 6H20L12 11ZM19 15L23 19L19 23V20H15V18H19V15Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
