import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconWbIncandescent = (props) => {
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
          d="M3.55 19.0898L4.96 20.4998L6.75 18.6998L5.34 17.2898L3.55 19.0898ZM11 19.9998H13V22.9998H11V19.9998ZM1 10.9998H4V12.9998H1V10.9998ZM13 4.0498V8.0098L14 8.5898C15.24 9.3098 16 10.6298 16 12.0498C16 14.2598 14.21 16.0498 12 16.0498C9.79 16.0498 8 14.2598 8 12.0498C8 10.6298 8.77 9.3098 10 8.5898L11 8.0098V4.0498H13ZM15 2.0498H9V6.85981C7.21 7.89981 6 9.8298 6 12.0498C6 15.3598 8.69 18.0498 12 18.0498C15.31 18.0498 18 15.3598 18 12.0498C18 9.8298 16.79 7.89981 15 6.85981V2.0498ZM20 10.9998H23V12.9998H20V10.9998ZM17.24 18.7098L19.03 20.5098L20.44 19.0998L18.64 17.3098L17.24 18.7098Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
