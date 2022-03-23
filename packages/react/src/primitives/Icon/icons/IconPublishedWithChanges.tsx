import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPublishedWithChanges } from '@aws-amplify/ui-react';` → `import { MdPublishedWithChanges } from 'react-icons/md';`
 */
export const IconPublishedWithChanges = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconPublishedWithChanges } from '@aws-amplify/ui-react'; → import { MdPublishedWithChanges } from 'react-icons/md';`,
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
          d="M18.6 19.4998H21V21.4998H15V15.4998H17V18.2298C18.83 16.7598 20 14.5198 20 11.9998C20 7.9298 16.94 4.5598 13 4.0698V2.0498C18.05 2.5498 22 6.8098 22 11.9998C22 14.9898 20.68 17.6698 18.6 19.4998ZM4 11.9998C4 9.4798 5.17 7.2298 7 5.7698V8.4998H9V2.4998H3V4.4998H5.4C3.32 6.3298 2 9.0098 2 11.9998C2 17.1898 5.95 21.4498 11 21.9498V19.9298C7.06 19.4398 4 16.0698 4 11.9998ZM16.24 8.1098L10.58 13.7698L7.75 10.9398L6.34 12.3498L10.58 16.5898L17.65 9.5198L16.24 8.1098Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
