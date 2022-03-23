import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconRingVolume } from '@aws-amplify/ui-react';` → `import { MdRingVolume } from 'react-icons/md';`
 */
export const IconRingVolume = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconRingVolume } from '@aws-amplify/ui-react'; → import { MdRingVolume } from 'react-icons/md';`,
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
          d="M23.71 16.67C20.66 13.78 16.54 12 12 12C7.46 12 3.34 13.78 0.29 16.67C0.11 16.85 0 17.1 0 17.38C0 17.66 0.11 17.91 0.29 18.09L2.77 20.57C2.95 20.75 3.2 20.86 3.48 20.86C3.75 20.86 4 20.75 4.18 20.58C4.97 19.84 5.87 19.22 6.84 18.73C7.17 18.57 7.4 18.23 7.4 17.83V14.73C8.85 14.25 10.4 14 12 14C13.6 14 15.15 14.25 16.6 14.72V17.82C16.6 18.21 16.83 18.56 17.16 18.72C18.14 19.21 19.03 19.84 19.82 20.57C20 20.75 20.25 20.85 20.52 20.85C20.8 20.85 21.05 20.74 21.23 20.56L23.71 18.08C23.89 17.9 24 17.65 24 17.37C24 17.1 23.89 16.85 23.71 16.67V16.67ZM5.4 17.23C4.74 17.6 4.11 18.03 3.53 18.5L2.46 17.43C3.37 16.68 4.36 16.04 5.41 15.53V17.23H5.4ZM20.47 18.49C19.88 18.01 19.26 17.59 18.6 17.22V15.52C19.64 16.03 20.63 16.67 21.54 17.42L20.47 18.49ZM21.16 6.26L19.75 4.85L16.19 8.4L17.6 9.81C17.6 9.81 21.05 6.29 21.16 6.26V6.26ZM11 2H13V7H11V2ZM6.4 9.81L7.81 8.4L4.26 4.84L2.84 6.26C2.95 6.29 6.4 9.81 6.4 9.81V9.81Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
