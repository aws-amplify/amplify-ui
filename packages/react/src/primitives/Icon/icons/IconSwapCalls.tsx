import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSwapCalls } from '@aws-amplify/ui-react';` → `import { MdSwapCalls } from 'react-icons/md';`
 */
export const IconSwapCalls = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSwapCalls } from '@aws-amplify/ui-react'; → import { MdSwapCalls } from 'react-icons/md';`,
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
          d="M18 4L14 8H17V15C17 16.1 16.1 17 15 17C13.9 17 13 16.1 13 15V8C13 5.79 11.21 4 9 4C6.79 4 5 5.79 5 8V15H2L6 19L10 15H7V8C7 6.9 7.9 6 9 6C10.1 6 11 6.9 11 8V15C11 17.21 12.79 19 15 19C17.21 19 19 17.21 19 15V8H22L18 4Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
