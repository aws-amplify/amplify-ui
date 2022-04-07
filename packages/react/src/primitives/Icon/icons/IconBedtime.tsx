import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconBedtime } from '@aws-amplify/ui-react';` → `import { MdBedtime } from 'react-icons/md';`
 */
export const IconBedtime = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconBedtime } from '@aws-amplify/ui-react'; → import { MdBedtime } from 'react-icons/md';`,
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
          d="M9.27 4.49001C7.64 12.03 13.02 16.9 16.93 18.29C15.54 19.38 13.81 20 12 20C7.59 20 4 16.41 4 12C4 8.55001 6.2 5.60001 9.27 4.49001ZM11.99 2.01001C6.4 2.01001 2 6.54001 2 12C2 17.52 6.48 22 12 22C15.71 22 18.93 19.98 20.66 16.98C13.15 16.73 8.57 8.55001 12.34 2.01001C12.22 2.01001 12.11 2.01001 11.99 2.01001Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
