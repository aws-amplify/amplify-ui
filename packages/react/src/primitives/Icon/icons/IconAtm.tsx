import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconAtm } from '@aws-amplify/ui-react';` → `import { MdAtm } from 'react-icons/md';`
 */
export const IconAtm = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconAtm } from '@aws-amplify/ui-react'; → import { MdAtm } from 'react-icons/md';`,
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
          d="M8 9V10.5H10.25V15H11.75V10.5H14V9H8ZM6 9H3C2.45 9 2 9.45 2 10V15H3.5V13.5H5.5V15H7V10C7 9.45 6.55 9 6 9ZM5.5 12H3.5V10.5H5.5V12ZM21 9H16.5C15.95 9 15.5 9.45 15.5 10V15H17V10.5H18V14H19.5V10.49H20.5V15H22V10C22 9.45 21.55 9 21 9Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
