import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSentimentVeryDissatisfied } from '@aws-amplify/ui-react';` → `import { MdSentimentVeryDissatisfied } from 'react-icons/md';`
 */
export const IconSentimentVeryDissatisfied = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSentimentVeryDissatisfied } from '@aws-amplify/ui-react'; → import { MdSentimentVeryDissatisfied } from 'react-icons/md';`,
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
          d="M12 13.5C9.67 13.5 7.69 14.96 6.89 17H17.11C16.31 14.96 14.33 13.5 12 13.5ZM7.82 12L8.88 10.94L9.94 12L11 10.94L9.94 9.88L11 8.82L9.94 7.76L8.88 8.82L7.82 7.76L6.76 8.82L7.82 9.88L6.76 10.94L7.82 12ZM11.99 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 11.99 22C17.51 22 22 17.53 22 12C22 6.47 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM16.18 7.76L15.12 8.82L14.06 7.76L13 8.82L14.06 9.88L13 10.94L14.06 12L15.12 10.94L16.18 12L17.24 10.94L16.18 9.88L17.24 8.82L16.18 7.76Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
