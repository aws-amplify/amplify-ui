import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconSettingsEthernet = (props) => {
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
          d="M7.77 6.75998L6.23 5.47998L0.82 12L6.23 18.52L7.77 17.24L3.42 12L7.77 6.75998ZM7 13H9V11H7V13ZM17 11H15V13H17V11ZM11 13H13V11H11V13ZM17.77 5.47998L16.23 6.75998L20.58 12L16.23 17.24L17.77 18.52L23.18 12L17.77 5.47998Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
