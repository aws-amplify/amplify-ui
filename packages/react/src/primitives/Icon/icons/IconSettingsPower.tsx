import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSettingsPower } from '@aws-amplify/ui-react';` → `import { MdSettingsPower } from 'react-icons/md';`
 */
export const IconSettingsPower = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSettingsPower } from '@aws-amplify/ui-react'; → import { MdSettingsPower } from 'react-icons/md';`,
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
          d="M7 24H9V22H7V24ZM11 24H13V22H11V24ZM13 2H11V12H13V2ZM16.56 4.44L15.11 5.89C16.84 6.94 18 8.83 18 11C18 14.31 15.31 17 12 17C8.69 17 6 14.31 6 11C6 8.83 7.16 6.94 8.88 5.88L7.44 4.44C5.36 5.88 4 8.28 4 11C4 15.42 7.58 19 12 19C16.42 19 20 15.42 20 11C20 8.28 18.64 5.88 16.56 4.44V4.44ZM15 24H17V22H15V24Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
