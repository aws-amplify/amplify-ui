import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconGavel } from '@aws-amplify/ui-react';` → `import { MdGavel } from 'react-icons/md';`
 */
export const IconGavel = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconGavel } from '@aws-amplify/ui-react'; → import { MdGavel } from 'react-icons/md';`,
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
          d="M1 21H13V23H1V21ZM5.24 8.07L8.07 5.24L22.21 19.38L19.38 22.21L5.24 8.07ZM12.32 1L17.98 6.66L15.15 9.49L9.49 3.83L12.32 1ZM3.83 9.48L9.49 15.14L6.66 17.97L1 12.31L3.83 9.48Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
