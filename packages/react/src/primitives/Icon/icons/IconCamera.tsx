import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconCamera } from '@aws-amplify/ui-react';` → `import { MdCamera } from 'react-icons/md';`
 */
export const IconCamera = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconCamera } from '@aws-amplify/ui-react'; → import { MdCamera } from 'react-icons/md';`,
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
          d="M14.25 2.26L14.17 2.22L14.16 2.24C13.46 2.09 12.74 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 7.25 18.69 3.28 14.25 2.26ZM19.41 9H11.42L14.13 4.3C16.53 4.96 18.48 6.72 19.41 9ZM13.1 4.08L10.27 9L9.12 11L6.4 6.3C7.84 4.88 9.82 4 12 4C12.37 4 12.74 4.03 13.1 4.08ZM5.7 7.09L8.54 12L9.69 14H4.26C4.1 13.36 4 12.69 4 12C4 10.15 4.64 8.45 5.7 7.09ZM4.59 15H12.57L9.86 19.7C7.46 19.03 5.52 17.28 4.59 15ZM10.9 19.91L14.89 13L17.61 17.7C16.16 19.12 14.18 20 12 20C11.62 20 11.26 19.96 10.9 19.91V19.91ZM18.3 16.91L14.3 10H19.73C19.9 10.64 20 11.31 20 12C20 13.85 19.36 15.55 18.3 16.91Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
