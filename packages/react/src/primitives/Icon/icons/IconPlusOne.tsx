import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPlusOne } from '@aws-amplify/ui-react';` → `import { MdPlusOne } from 'react-icons/md';`
 */
export const IconPlusOne = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconPlusOne } from '@aws-amplify/ui-react'; → import { MdPlusOne } from 'react-icons/md';`,
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
          d="M10 8H8V12H4V14H8V18H10V14H14V12H10V8ZM14.5 6.08V7.9L17 7.4V18H19V5L14.5 6.08Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
