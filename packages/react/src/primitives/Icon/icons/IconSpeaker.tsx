import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSpeaker } from '@aws-amplify/ui-react';` → `import { MdSpeaker } from 'react-icons/md';`
 */
export const IconSpeaker = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconSpeaker');
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
          d="M17 2H7C5.9 2 5 2.9 5 4V20C5 21.1 5.9 21.99 7 21.99L17 22C18.1 22 19 21.1 19 20V4C19 2.9 18.1 2 17 2ZM7 20V4H17V20H7ZM12 9C13.1 9 14 8.1 14 7C14 5.9 13.1 5 12 5C10.89 5 10 5.9 10 7C10 8.1 10.89 9 12 9ZM12 11C9.79 11 8 12.79 8 15C8 17.21 9.79 19 12 19C14.21 19 16 17.21 16 15C16 12.79 14.21 11 12 11ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
