import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconHighlight } from '@aws-amplify/ui-react';` → `import { MdHighlight } from 'react-icons/md';`
 */
export const IconHighlight = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconHighlight } from '@aws-amplify/ui-react'; → import { MdHighlight } from 'react-icons/md';`,
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
          d="M5.99995 14L8.99995 17V22H15V17L18 14V9H5.99995V14ZM7.99995 11H16V13.17L13 16.17V20H11V16.17L7.99995 13.17V11ZM11 2H13V5H11V2ZM3.50195 5.874L4.91595 4.46L7.03795 6.58L5.62395 7.995L3.50195 5.874ZM16.96 6.582L19.083 4.462L20.496 5.878L18.373 7.998L16.96 6.582Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
