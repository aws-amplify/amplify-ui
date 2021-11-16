import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconMarkChatRead = (props) => {
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
          d="M12 18H6L2 22V4C2 2.9 2.9 2 4 2H20C21.1 2 22 2.9 22 4V11H20V4H4V16H12V18ZM23 14.34L21.59 12.93L17.35 17.17L15.23 15.05L13.82 16.46L17.34 20L23 14.34Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
