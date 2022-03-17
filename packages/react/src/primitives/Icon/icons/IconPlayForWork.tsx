import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPlayForWork } from '@aws-amplify/ui-react';` → `import { MdPlayForWork } from 'react-icons/md';`
 */
export const IconPlayForWork = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconPlayForWork } from '@aws-amplify/ui-react'; → import { MdPlayForWork } from 'react-icons/md';`,
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
          d="M11 5V10.59H7.5L12 15.09L16.5 10.59H13V5H11ZM6 14C6 17.31 8.69 20 12 20C15.31 20 18 17.31 18 14H16C16 16.21 14.21 18 12 18C9.79 18 8 16.21 8 14H6Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
