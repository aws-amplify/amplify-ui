import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconAddLocationAlt } from '@aws-amplify/ui-react';` → `import { MdAddLocationAlt } from 'react-icons/md';`
 */
export const IconAddLocationAlt = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconAddLocationAlt } from '@aws-amplify/ui-react'; → import { MdAddLocationAlt } from 'react-icons/md';`,
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
          d="M20 1V4H23V6H20V9H18V6H15V4H18V1H20ZM12 13C10.9 13 10 12.1 10 11C10 9.9 10.9 9 12 9C13.1 9 14 9.9 14 11C14 12.1 13.1 13 12 13ZM13 3.06V5.08C12.6692 5.02773 12.3349 5.00098 12 5C8.65 5 6 7.57 6 11.2C6 13.54 7.95 16.64 12 20.34C16.05 16.64 18 13.55 18 11.2V11H20V11.2C20 14.52 17.33 18.45 12 23C6.67 18.45 4 14.52 4 11.2C4 6.22 7.8 3 12 3C12.34 3 12.67 3.02 13 3.06V3.06Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
