import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconBluetoothAudio } from '@aws-amplify/ui-react';` → `import { MdBluetoothAudio } from 'react-icons/md';`
 */
export const IconBluetoothAudio = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconBluetoothAudio } from '@aws-amplify/ui-react'; → import { MdBluetoothAudio } from 'react-icons/md';`,
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
          d="M14.24 12.01L16.56 14.33C16.84 13.61 17 12.82 17 12C17 11.18 16.84 10.41 16.57 9.69L14.24 12.01ZM19.53 6.71L18.27 7.97C18.9 9.18 19.25 10.54 19.25 11.99C19.25 13.44 18.89 14.81 18.27 16.01L19.47 17.21C20.44 15.67 21.01 13.85 21.01 11.9C21 10.01 20.46 8.23 19.53 6.71V6.71ZM15.71 7.71L10 2H9V9.59L4.41 5L3 6.41L8.59 12L3 17.59L4.41 19L9 14.41V22H10L15.71 16.29L11.41 12L15.71 7.71ZM11 5.83L12.88 7.71L11 9.59V5.83ZM12.88 16.29L11 18.17V14.41L12.88 16.29V16.29Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
