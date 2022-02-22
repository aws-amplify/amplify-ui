import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconReadMore } from '@aws-amplify/ui-react';` → `import { MdReadMore } from 'react-icons/md';`
 */
export const IconReadMore = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconReadMore } from '@aws-amplify/ui-react'; → import { MdReadMore } from 'react-icons/md';`,
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
        <path d="M22 7H13V9H22V7Z" fill="currentColor" />
        <path d="M22 15H13V17H22V15Z" fill="black" />
        <path d="M22 11H16V13H22V11Z" fill="black" />
        <path d="M13 12L8 7V11H2V13H8V17L13 12Z" fill="black" />
      </svg>
    </View>
  );
};
