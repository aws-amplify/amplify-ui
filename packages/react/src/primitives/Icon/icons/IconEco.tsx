import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconEco } from '@aws-amplify/ui-react';` → `import { MdEco } from 'react-icons/md';`
 */
export const IconEco = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconEco } from '@aws-amplify/ui-react'; → import { MdEco } from 'react-icons/md';`,
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
          d="M6.05 8.05C3.32 10.78 3.32 15.22 6.05 17.95C7.42 19.32 9.21 20 11 20C12.79 20 14.58 19.32 15.95 17.95C19.43 14.47 20 4 20 4C20 4 9.53 4.57 6.05 8.05ZM14.54 16.54C13.59 17.48 12.34 18 11 18C10.11 18 9.27 17.75 8.52 17.32C9.44 14.44 11.14 11.91 13.4 10C10.77 11.36 8.56 13.46 7.03 16C5.55 14.04 5.68 11.25 7.47 9.46C9.21 7.72 14.04 6.65 17.8 6.2C17.35 9.96 16.28 14.79 14.54 16.54Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
