import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconPlaylistPlay = (props) => {
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
          d="M4 10H16V12H4V10ZM4 6H16V8H4V6ZM4 14H12V16H4V14ZM14 14V20L19 17L14 14Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
