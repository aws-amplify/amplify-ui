import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconCrop } from '@aws-amplify/ui-react';` → `import { MdCrop } from 'react-icons/md';`
 */
export const IconCrop = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconCrop } from '@aws-amplify/ui-react'; → import { MdCrop } from 'react-icons/md';`,
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
          d="M17 15H19V7C19 5.9 18.1 5 17 5H9V7H17V15ZM7 17V1H5V5H1V7H5V17C5 18.1 5.9 19 7 19H17V23H19V19H23V17H7Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
