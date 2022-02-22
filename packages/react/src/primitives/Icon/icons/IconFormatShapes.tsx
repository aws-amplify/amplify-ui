import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconFormatShapes } from '@aws-amplify/ui-react';` → `import { MdFormatShapes } from 'react-icons/md';`
 */
export const IconFormatShapes = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconFormatShapes } from '@aws-amplify/ui-react'; → import { MdFormatShapes } from 'react-icons/md';`,
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
          d="M23 7V1H17V3H7V1H1V7H3V17H1V23H7V21H17V23H23V17H21V7H23ZM3 3H5V5H3V3ZM5 21H3V19H5V21ZM17 19H7V17H5V7H7V5H17V7H19V17H17V19ZM21 21H19V19H21V21ZM19 5V3H21V5H19ZM13.73 14H10.24L9.51 16H7.89L11.29 7H12.69L16.1 16H14.47L13.73 14V14ZM10.69 12.74H13.3L12 8.91L10.69 12.74V12.74Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
