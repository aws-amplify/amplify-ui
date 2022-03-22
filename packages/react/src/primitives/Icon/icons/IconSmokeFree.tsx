import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSmokeFree } from '@aws-amplify/ui-react';` → `import { MdSmokeFree } from 'react-icons/md';`
 */
export const IconSmokeFree = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSmokeFree } from '@aws-amplify/ui-react'; → import { MdSmokeFree } from 'react-icons/md';`,
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
          d="M20.5 13.0002H22V16.0002H20.5V13.0002ZM18 13.0002H19.5V16.0002H18V13.0002ZM17 13.0002H14.66L17 15.3402V13.0002ZM14.5 8.6502H16.03C17.08 8.6502 18 9.3902 18 10.7002V12.0002H19.5V10.3602C19.5 8.5502 17.9 7.2002 16.03 7.2002H14.5C13.48 7.2002 12.65 6.2202 12.65 5.2002C12.65 4.1802 13.48 3.4502 14.5 3.4502V1.9502C12.65 1.9502 11.15 3.4502 11.15 5.3002C11.15 7.1502 12.65 8.6502 14.5 8.6502V8.6502ZM18.85 4.7302C19.47 4.1202 19.85 3.2802 19.85 2.3502H18.35C18.35 3.3702 17.52 4.2002 16.5 4.2002V5.7002C18.74 5.7002 20.5 7.5302 20.5 9.7702V12.0002H22V9.7602C22 7.5402 20.72 5.6202 18.85 4.7302V4.7302ZM3.41 4.5902L2 6.0002L9 13.0002H2V16.0002H12L19 23.0002L20.41 21.5902L3.41 4.5902Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
