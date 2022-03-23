import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSentimentVerySatisfied } from '@aws-amplify/ui-react';` → `import { MdSentimentVerySatisfied } from 'react-icons/md';`
 */
export const IconSentimentVerySatisfied = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSentimentVerySatisfied } from '@aws-amplify/ui-react'; → import { MdSentimentVerySatisfied } from 'react-icons/md';`,
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
          d="M11.99 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 11.99 22C17.51 22 22 17.53 22 12C22 6.47 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM13 9.94L14.06 11L15.12 9.94L16.18 11L17.24 9.94L15.12 7.82L13 9.94ZM8.88 9.94L9.94 11L11 9.94L8.88 7.82L6.76 9.94L7.82 11L8.88 9.94V9.94ZM12 17.5C14.33 17.5 16.31 16.04 17.11 14H6.89C7.69 16.04 9.67 17.5 12 17.5Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
