import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconAccessAlarms } from '@aws-amplify/ui-react';` → `import { MdAccessAlarms } from 'react-icons/md';`
 */
export const IconAccessAlarms = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconAccessAlarms');
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
          d="M22 5.6998L17.4 1.7998L16.1 3.2998L20.7 7.1998L22 5.6998ZM7.9 3.3998L6.6 1.8998L2 5.6998L3.3 7.1998L7.9 3.3998V3.3998ZM12.5 7.9998H11V13.9998L15.7 16.8998L16.5 15.6998L12.5 13.2998V7.9998ZM12 3.9998C7 3.9998 3 7.9998 3 12.9998C3 17.9998 7 21.9998 12 21.9998C17 21.9998 21 17.9998 21 12.9998C21 7.9998 17 3.9998 12 3.9998ZM12 19.9998C8.1 19.9998 5 16.8998 5 12.9998C5 9.0998 8.1 5.9998 12 5.9998C15.9 5.9998 19 9.0998 19 12.9998C19 16.8998 15.9 19.9998 12 19.9998Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
