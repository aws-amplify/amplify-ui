import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconMergeType } from '@aws-amplify/ui-react';` → `import { MdMergeType } from 'react-icons/md';`
 */
export const IconMergeType = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconMergeType } from '@aws-amplify/ui-react'; → import { MdMergeType } from 'react-icons/md';`,
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
          d="M17.0001 20.41L18.4101 19L15.0001 15.59L13.5901 17L17.0001 20.41ZM7.50009 8H11.0001V13.59L5.59009 19L7.00009 20.41L13.0001 14.41V8H16.5001L12.0001 3.5L7.50009 8Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
