import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconVolumeDown } from '@aws-amplify/ui-react';` → `import { MdVolumeDown } from 'react-icons/md';`
 */
export const IconVolumeDown = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconVolumeDown } from '@aws-amplify/ui-react'; → import { MdVolumeDown } from 'react-icons/md';`,
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
          d="M16 7.97V16.02C17.48 15.29 18.5 13.77 18.5 12C18.5 10.23 17.48 8.71 16 7.97ZM5 9V15H9L14 20V4L9 9H5ZM12 8.83V15.17L9.83 13H7V11H9.83L12 8.83Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
