import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconFormatColorReset } from '@aws-amplify/ui-react';` → `import { MdFormatColorReset } from 'react-icons/md';`
 */
export const IconFormatColorReset = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconFormatColorReset } from '@aws-amplify/ui-react'; → import { MdFormatColorReset } from 'react-icons/md';`,
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
          d="M12 6.3602C13.53 8.3602 15.08 10.7902 15.71 12.6002L17.94 14.8302C17.97 14.5602 18 14.2802 18 14.0002C18 10.0202 12 3.2002 12 3.2002C12 3.2002 10.82 4.5502 9.5 6.3902L10.94 7.8302C11.28 7.3202 11.64 6.8302 12 6.3602ZM5.41 5.1402L4 6.5502L7.32 9.8702C6.55 11.3302 6 12.7902 6 14.0002C6 17.3102 8.69 20.0002 12 20.0002C13.52 20.0002 14.9 19.4302 15.95 18.5002L18.58 21.1302L20 19.7202L5.41 5.1402ZM12 18.0002C9.79 18.0002 8 16.2102 8 14.0002C8 13.3102 8.32 12.3802 8.81 11.3602L14.53 17.0802C13.83 17.6402 12.96 18.0002 12 18.0002V18.0002Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
