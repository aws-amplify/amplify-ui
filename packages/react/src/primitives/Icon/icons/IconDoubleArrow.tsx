import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconDoubleArrow } from '@aws-amplify/ui-react';` → `import { MdDoubleArrow } from 'react-icons/md';`
 */
export const IconDoubleArrow = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconDoubleArrow } from '@aws-amplify/ui-react'; → import { MdDoubleArrow } from 'react-icons/md';`,
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
          d="M15.5 5H11L16 12L11 19H15.5L20.5 12L15.5 5Z"
          fill="currentColor"
        />
        <path d="M8.5 5H4L9 12L4 19H8.5L13.5 12L8.5 5Z" fill="black" />
      </svg>
    </View>
  );
};
