import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconRowing } from '@aws-amplify/ui-react';` → `import { MdRowing } from 'react-icons/md';`
 */
export const IconRowing = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconRowing } from '@aws-amplify/ui-react'; → import { MdRowing } from 'react-icons/md';`,
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
          d="M8.5 14.5L4 19L5.5 20.5L9 17H11L8.5 14.5ZM15 1C13.9 1 13 1.9 13 3C13 4.1 13.9 5 15 5C16.1 5 17 4.1 17 3C17 1.9 16.1 1 15 1ZM21 21.01L18 24L15.01 20.99V19.5L7.91 12.41C7.6 12.46 7.3 12.48 7 12.48V10.32C8.66 10.35 10.61 9.45 11.67 8.28L13.07 6.73C13.26 6.52 13.5 6.35 13.76 6.23C14.05 6.09 14.38 6 14.72 6H14.75C15.99 6.01 17 7.02 17 8.26V14.01C17 14.85 16.65 15.62 16.08 16.17L12.5 12.59V10.32C11.87 10.84 11.07 11.34 10.21 11.71L16.5 18H18L21 21.01V21.01Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
