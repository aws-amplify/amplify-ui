import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconLowPriority } from '@aws-amplify/ui-react';` → `import { MdLowPriority } from 'react-icons/md';`
 */
export const IconLowPriority = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconLowPriority } from '@aws-amplify/ui-react'; → import { MdLowPriority } from 'react-icons/md';`,
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
          d="M14 5H22V7H14V5ZM14 10.5H22V12.5H14V10.5ZM14 16H22V18H14V16ZM2 11.5C2 15.08 4.92 18 8.5 18H9V20L12 17L9 14V16H8.5C6.02 16 4 13.98 4 11.5C4 9.02 6.02 7 8.5 7H12V5H8.5C4.92 5 2 7.92 2 11.5Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
