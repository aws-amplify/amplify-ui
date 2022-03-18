import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconTonality } from '@aws-amplify/ui-react';` → `import { MdTonality } from 'react-icons/md';`
 */
export const IconTonality = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconTonality } from '@aws-amplify/ui-react'; → import { MdTonality } from 'react-icons/md';`,
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
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.06 19.44 4 16.08 4 12C4 7.92 7.05 4.56 11 4.07V19.93ZM13 4.07C14.03 4.2 15 4.52 15.87 5H13V4.07ZM13 7H18.24C18.49 7.31 18.72 7.65 18.92 8H13V7ZM13 10H19.74C19.82 10.33 19.89 10.66 19.93 11H13V10ZM13 19.93V19H15.87C15 19.48 14.03 19.8 13 19.93ZM18.24 17H13V16H18.92C18.72 16.35 18.49 16.69 18.24 17V17ZM19.74 14H13V13H19.93C19.89 13.34 19.82 13.67 19.74 14Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
