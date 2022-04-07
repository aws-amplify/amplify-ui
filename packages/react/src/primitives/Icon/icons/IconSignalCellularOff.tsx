import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSignalCellularOff } from '@aws-amplify/ui-react';` → `import { MdSignalCellularOff } from 'react-icons/md';`
 */
export const IconSignalCellularOff = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSignalCellularOff } from '@aws-amplify/ui-react'; → import { MdSignalCellularOff } from 'react-icons/md';`,
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
          d="M21 1L12.69 9.31L21 17.61V1ZM4.91 4.36L3.5 5.77L9.86 12.14L1 21H18.73L20.73 23L22.14 21.59L4.91 4.36Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
