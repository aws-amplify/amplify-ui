import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconMultipleStop } from '@aws-amplify/ui-react';` → `import { MdMultipleStop } from 'react-icons/md';`
 */
export const IconMultipleStop = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconMultipleStop } from '@aws-amplify/ui-react'; → import { MdMultipleStop } from 'react-icons/md';`,
  });
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
          d="M17 4L21 8L17 12V9H13V7H17V4ZM10 7C9.45 7 9 7.45 9 8C9 8.55 9.45 9 10 9C10.55 9 11 8.55 11 8C11 7.45 10.55 7 10 7ZM6 7C5.45 7 5 7.45 5 8C5 8.55 5.45 9 6 9C6.55 9 7 8.55 7 8C7 7.45 6.55 7 6 7ZM7 17H11V15H7V12L3 16L7 20V17ZM14 17C14.55 17 15 16.55 15 16C15 15.45 14.55 15 14 15C13.45 15 13 15.45 13 16C13 16.55 13.45 17 14 17ZM18 17C18.55 17 19 16.55 19 16C19 15.45 18.55 15 18 15C17.45 15 17 15.45 17 16C17 16.55 17.45 17 18 17Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
