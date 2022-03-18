import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSettingsCell } from '@aws-amplify/ui-react';` → `import { MdSettingsCell } from 'react-icons/md';`
 */
export const IconSettingsCell = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSettingsCell } from '@aws-amplify/ui-react'; → import { MdSettingsCell } from 'react-icons/md';`,
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
          d="M7 22H9V24H7V22ZM11 22H13V24H11V22ZM15 22H17V24H15V22ZM16 0.01L8 0C6.9 0 6 0.9 6 2V18C6 19.1 6.9 20 8 20H16C17.1 20 18 19.1 18 18V2C18 0.9 17.1 0.01 16 0.01V0.01ZM16 18H8V17H16V18ZM16 15H8V5H16V15ZM16 3H8V2H16V3Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
