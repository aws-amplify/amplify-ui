import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconLinkedCamera } from '@aws-amplify/ui-react';` → `import { MdLinkedCamera } from 'react-icons/md';`
 */
export const IconLinkedCamera = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconLinkedCamera } from '@aws-amplify/ui-react'; → import { MdLinkedCamera } from 'react-icons/md';`,
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
          d="M20 9V20H4V8H8.05L9.88 6H15V4H9L7.17 6H4C2.9 6 2 6.9 2 8V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V9H20ZM20.67 7.99H22C21.99 4.68 19.31 2 16 2V3.33C18.58 3.33 20.66 5.41 20.67 7.99ZM18 7.99H19.33C19.32 6.15 17.84 4.67 16 4.67V6C17.11 6 17.99 6.89 18 7.99ZM7 14C7 16.76 9.24 19 12 19C14.76 19 17 16.76 17 14C17 11.24 14.76 9 12 9C9.24 9 7 11.24 7 14ZM15 14C15 15.65 13.65 17 12 17C10.35 17 9 15.65 9 14C9 12.35 10.35 11 12 11C13.65 11 15 12.34 15 14Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
