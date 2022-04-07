import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconDesktopAccessDisabled } from '@aws-amplify/ui-react';` → `import { MdDesktopAccessDisabled } from 'react-icons/md';`
 */
export const IconDesktopAccessDisabled = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconDesktopAccessDisabled } from '@aws-amplify/ui-react'; → import { MdDesktopAccessDisabled } from 'react-icons/md';`,
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
          d="M1.41 1.68994L0 3.09994L1 4.08994V15.9999C1 17.0999 1.89 17.9999 2.99 17.9999H10V19.9999H8V21.9999H16V19.9999H14V17.9999H14.9L20.9 23.9999L22.31 22.5899L1.41 1.68994V1.68994ZM2.99 15.9999V6.08994L12.9 15.9999H2.99ZM4.55 1.99994L6.55 3.99994H21V15.9999H18.55L20.55 17.9999H20.99C22.09 17.9999 22.99 17.0999 22.99 15.9999V3.99994C22.99 2.89994 22.09 1.99994 20.99 1.99994H4.55Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
