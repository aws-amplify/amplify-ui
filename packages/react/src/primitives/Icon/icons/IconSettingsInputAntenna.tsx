import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSettingsInputAntenna } from '@aws-amplify/ui-react';` → `import { MdSettingsInputAntenna } from 'react-icons/md';`
 */
export const IconSettingsInputAntenna = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSettingsInputAntenna } from '@aws-amplify/ui-react'; → import { MdSettingsInputAntenna } from 'react-icons/md';`,
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
          d="M12 5C8.13 5 5 8.13 5 12H7C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12H19C19 8.13 15.87 5 12 5ZM13 14.29C13.88 13.9 14.5 13.03 14.5 12C14.5 10.62 13.38 9.5 12 9.5C10.62 9.5 9.5 10.62 9.5 12C9.5 13.02 10.12 13.9 11 14.29V17.59L7.59 21L9 22.41L12 19.41L15 22.41L16.41 21L13 17.59V14.29ZM12 1C5.93 1 1 5.93 1 12H3C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12H23C23 5.93 18.07 1 12 1Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
