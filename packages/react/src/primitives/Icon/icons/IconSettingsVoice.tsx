import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSettingsVoice } from '@aws-amplify/ui-react';` → `import { MdSettingsVoice } from 'react-icons/md';`
 */
export const IconSettingsVoice = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSettingsVoice } from '@aws-amplify/ui-react'; → import { MdSettingsVoice } from 'react-icons/md';`,
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
          d="M7 22H9V24H7V22ZM12 13C13.66 13 15 11.66 15 10V4C15 2.34 13.66 1 12 1C10.34 1 9 2.34 9 4V10C9 11.66 10.34 13 12 13ZM11 4C11 3.45 11.45 3 12 3C12.55 3 13 3.45 13 4V10C13 10.56 12.56 11 12 11C11.45 11 11 10.55 11 10V4ZM11 22H13V24H11V22ZM15 22H17V24H15V22ZM19 10H17.3C17.3 13 14.76 15.1 12 15.1C9.24 15.1 6.7 13 6.7 10H5C5 13.41 7.72 16.23 11 16.72V20H13V16.72C16.28 16.23 19 13.41 19 10Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
