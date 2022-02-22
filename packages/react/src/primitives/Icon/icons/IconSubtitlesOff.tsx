import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSubtitlesOff } from '@aws-amplify/ui-react';` → `import { MdSubtitlesOff } from 'react-icons/md';`
 */
export const IconSubtitlesOff = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSubtitlesOff } from '@aws-amplify/ui-react'; → import { MdSubtitlesOff } from 'react-icons/md';`,
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
          d="M20 4H6.83002L8.83002 6H20V17.17L21.76 18.93C21.91 18.65 22 18.34 22 18V6C22 4.9 21.1 4 20 4Z"
          fill="currentColor"
        />
        <path d="M18 10H12.83L14.83 12H18V10Z" fill="black" />
        <path
          d="M1.04001 3.8702L2.24001 5.0702C2.09001 5.3502 2.00001 5.6602 2.00001 6.0002V18.0002C2.00001 19.1002 2.90001 20.0002 4.00001 20.0002H17.17L20.13 22.9602L21.54 21.5502L2.45001 2.4502L1.04001 3.8702ZM4.00001 6.8302L7.17001 10.0002H6.00001V12.0002H8.00001V10.8302L11.17 14.0002H6.00001V16.0002H13.17L15.17 18.0002H4.00001V6.8302Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
