import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPreview } from '@aws-amplify/ui-react';` → `import { MdPreview } from 'react-icons/md';`
 */
export const IconPreview = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconPreview } from '@aws-amplify/ui-react'; → import { MdPreview } from 'react-icons/md';`,
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
          d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.11 3 19 3ZM19 19H5V7H19V19ZM12 10.5C13.84 10.5 15.48 11.46 16.34 13C15.48 14.54 13.84 15.5 12 15.5C10.16 15.5 8.52 14.54 7.66 13C8.52 11.46 10.16 10.5 12 10.5ZM12 9C9.27 9 6.94 10.66 6 13C6.94 15.34 9.27 17 12 17C14.73 17 17.06 15.34 18 13C17.06 10.66 14.73 9 12 9ZM12 14.5C11.17 14.5 10.5 13.83 10.5 13C10.5 12.17 11.17 11.5 12 11.5C12.83 11.5 13.5 12.17 13.5 13C13.5 13.83 12.83 14.5 12 14.5Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
