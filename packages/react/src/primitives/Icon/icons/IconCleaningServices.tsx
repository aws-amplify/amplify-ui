import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconCleaningServices } from '@aws-amplify/ui-react';` → `import { MdCleaningServices } from 'react-icons/md';`
 */
export const IconCleaningServices = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconCleaningServices } from '@aws-amplify/ui-react'; → import { MdCleaningServices } from 'react-icons/md';`,
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
          d="M16 11H15V3C15 1.9 14.1 1 13 1H11C9.9 1 9 1.9 9 3V11H8C5.24 11 3 13.24 3 16V23H21V16C21 13.24 18.76 11 16 11ZM11 3H13V11H11V3ZM19 21H17V18C17 17.45 16.55 17 16 17C15.45 17 15 17.45 15 18V21H13V18C13 17.45 12.55 17 12 17C11.45 17 11 17.45 11 18V21H9V18C9 17.45 8.55 17 8 17C7.45 17 7 17.45 7 18V21H5V16C5 14.35 6.35 13 8 13H16C17.65 13 19 14.35 19 16V21Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
