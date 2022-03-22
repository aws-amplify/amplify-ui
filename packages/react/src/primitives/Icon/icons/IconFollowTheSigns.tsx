import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconFollowTheSigns } from '@aws-amplify/ui-react';` → `import { MdFollowTheSigns } from 'react-icons/md';`
 */
export const IconFollowTheSigns = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconFollowTheSigns } from '@aws-amplify/ui-react'; → import { MdFollowTheSigns } from 'react-icons/md';`,
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
          d="M9.5 5.5C10.6 5.5 11.5 4.6 11.5 3.5C11.5 2.4 10.6 1.5 9.5 1.5C8.4 1.5 7.5 2.4 7.5 3.5C7.5 4.6 8.4 5.5 9.5 5.5ZM5.75 8.9L3 23H5.1L6.85 15L9 17V23H11V15.45L8.95 13.4L9.55 10.4C10.85 12 12.8 13 15 13V11C13.15 11 11.55 10 10.65 8.55L9.7 6.95C9.35 6.35 8.7 6 8 6C7.75 6 7.5 6.05 7.25 6.15L2 8.3V13H4V9.65L5.75 8.9ZM13 2V9H16.75V23H18.25V9H22V2H13ZM18.01 8V6.25H14.5V4.75H18.01V3L20.5 5.5L18.01 8Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
