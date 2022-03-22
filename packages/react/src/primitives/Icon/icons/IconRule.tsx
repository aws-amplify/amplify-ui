import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconRule } from '@aws-amplify/ui-react';` → `import { MdRule } from 'react-icons/md';`
 */
export const IconRule = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconRule } from '@aws-amplify/ui-react'; → import { MdRule } from 'react-icons/md';`,
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
          d="M16.54 11.0002L13 7.46018L14.41 6.05018L16.53 8.17018L20.77 3.93018L22.18 5.34018L16.54 11.0002ZM11 7.00018H2V9.00018H11V7.00018ZM21 13.4102L19.59 12.0002L17 14.5902L14.41 12.0002L13 13.4102L15.59 16.0002L13 18.5902L14.41 20.0002L17 17.4102L19.59 20.0002L21 18.5902L18.41 16.0002L21 13.4102ZM11 15.0002H2V17.0002H11V15.0002Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
