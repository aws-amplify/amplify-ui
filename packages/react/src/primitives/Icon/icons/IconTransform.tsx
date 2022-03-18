import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconTransform } from '@aws-amplify/ui-react';` → `import { MdTransform } from 'react-icons/md';`
 */
export const IconTransform = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconTransform } from '@aws-amplify/ui-react'; → import { MdTransform } from 'react-icons/md';`,
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
          d="M22 18V16H8V4H10L7 1L4 4H6V6H2V8H6V16C6 17.1 6.9 18 8 18H16V20H14L17 23L20 20H18V18H22ZM10 8H16V14H18V8C18 6.9 17.1 6 16 6H10V8Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
