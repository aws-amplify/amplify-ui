import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSettingsBrightness } from '@aws-amplify/ui-react';` → `import { MdSettingsBrightness } from 'react-icons/md';`
 */
export const IconSettingsBrightness = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSettingsBrightness } from '@aws-amplify/ui-react'; → import { MdSettingsBrightness } from 'react-icons/md';`,
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
          d="M21 3H3C1.9 3 1 3.9 1 5V19C1 20.1 1.9 21 3 21H21C22.1 21 23 20.1 23 19V5C23 3.9 22.1 3 21 3ZM21 19.01H3V4.99H21V19.01V19.01ZM8 16H10.5L12 17.5L13.5 16H16V13.5L17.5 12L16 10.5V8H13.5L12 6.5L10.5 8H8V10.5L6.5 12L8 13.5V16ZM12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15V9Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
