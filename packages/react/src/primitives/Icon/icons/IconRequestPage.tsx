import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconRequestPage } from '@aws-amplify/ui-react';` → `import { MdRequestPage } from 'react-icons/md';`
 */
export const IconRequestPage = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconRequestPage } from '@aws-amplify/ui-react'; → import { MdRequestPage } from 'react-icons/md';`,
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
          d="M13.17 4L18 8.83V20H6V4H13.17ZM14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM15 11H11V12H14C14.55 12 15 12.45 15 13V16C15 16.55 14.55 17 14 17H13V18H11V17H9V15H13V14H10C9.45 14 9 13.55 9 13V10C9 9.45 9.45 9 10 9H11V8H13V9H15V11Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
