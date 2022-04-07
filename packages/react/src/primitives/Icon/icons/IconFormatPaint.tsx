import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconFormatPaint } from '@aws-amplify/ui-react';` → `import { MdFormatPaint } from 'react-icons/md';`
 */
export const IconFormatPaint = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconFormatPaint } from '@aws-amplify/ui-react'; → import { MdFormatPaint } from 'react-icons/md';`,
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
          d="M18 4V3C18 2.45 17.55 2 17 2H5C4.45 2 4 2.45 4 3V7C4 7.55 4.45 8 5 8H17C17.55 8 18 7.55 18 7V6H19V10H9V21C9 21.55 9.45 22 10 22H12C12.55 22 13 21.55 13 21V12H21V4H18ZM16 6H6V4H16V6Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
