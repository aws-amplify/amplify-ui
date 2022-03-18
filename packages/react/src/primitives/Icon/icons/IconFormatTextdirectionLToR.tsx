import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconFormatTextdirectionLToR } from '@aws-amplify/ui-react';` → `import { MdFormatTextdirectionLToR } from 'react-icons/md';`
 */
export const IconFormatTextdirectionLToR = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconFormatTextdirectionLToR } from '@aws-amplify/ui-react'; → import { MdFormatTextdirectionLToR } from 'react-icons/md';`,
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
          d="M9 4V8C7.9 8 7 7.1 7 6C7 4.9 7.9 4 9 4ZM17 2H9C6.79 2 5 3.79 5 6C5 8.21 6.79 10 9 10V15H11V4H13V15H15V4H17V2ZM17 14V17H5V19H17V22L21 18L17 14Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
