import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconAccessibleForward } from '@aws-amplify/ui-react';` → `import { MdAccessibleForward } from 'react-icons/md';`
 */
export const IconAccessibleForward = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconAccessibleForward } from '@aws-amplify/ui-react'; → import { MdAccessibleForward } from 'react-icons/md';`,
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
          d="M18 6.54004C19.1046 6.54004 20 5.64461 20 4.54004C20 3.43547 19.1046 2.54004 18 2.54004C16.8954 2.54004 16 3.43547 16 4.54004C16 5.64461 16.8954 6.54004 18 6.54004Z"
          fill="currentColor"
        />
        <path
          d="M15 17H13C13 18.65 11.65 20 10 20C8.35 20 7 18.65 7 17C7 15.35 8.35 14 10 14V12C7.24 12 5 14.24 5 17C5 19.76 7.24 22 10 22C12.76 22 15 19.76 15 17ZM18 13.5H16.14L17.81 9.83C18.42 8.5 17.44 7 15.96 7H10.76C9.95 7 9.22 7.47 8.89 8.2L8.22 10L10.14 10.53L10.79 9H13L11.17 13.1C10.57 14.43 11.56 16 13.02 16H18V21H20V15.5C20 14.4 19.1 13.5 18 13.5Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
