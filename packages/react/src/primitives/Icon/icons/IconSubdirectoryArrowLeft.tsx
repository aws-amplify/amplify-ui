import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSubdirectoryArrowLeft } from '@aws-amplify/ui-react';` → `import { MdSubdirectoryArrowLeft } from 'react-icons/md';`
 */
export const IconSubdirectoryArrowLeft = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSubdirectoryArrowLeft } from '@aws-amplify/ui-react'; → import { MdSubdirectoryArrowLeft } from 'react-icons/md';`,
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
          d="M11 9L12.42 10.42L8.83 14H18V4H20V16H8.83L12.42 19.58L11 21L5 15L11 9Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
