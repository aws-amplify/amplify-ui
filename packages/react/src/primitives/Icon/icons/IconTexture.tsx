import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconTexture } from '@aws-amplify/ui-react';` → `import { MdTexture } from 'react-icons/md';`
 */
export const IconTexture = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconTexture } from '@aws-amplify/ui-react'; → import { MdTexture } from 'react-icons/md';`,
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
          d="M19.51 3.08L3.08 19.51C3.17 19.85 3.35 20.16 3.59 20.41C3.84 20.65 4.15 20.83 4.49 20.92L20.93 4.49C20.74 3.8 20.2 3.26 19.51 3.08V3.08ZM11.88 3L3 11.88V14.71L14.71 3H11.88ZM5 3C3.9 3 3 3.9 3 5V7L7 3H5ZM19 21C19.55 21 20.05 20.78 20.41 20.41C20.78 20.05 21 19.55 21 19V17L17 21H19ZM9.29 21H12.12L21 12.12V9.29L9.29 21Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
