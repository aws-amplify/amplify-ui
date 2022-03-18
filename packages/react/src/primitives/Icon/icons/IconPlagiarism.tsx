import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPlagiarism } from '@aws-amplify/ui-react';` → `import { MdPlagiarism } from 'react-icons/md';`
 */
export const IconPlagiarism = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconPlagiarism } from '@aws-amplify/ui-react'; → import { MdPlagiarism } from 'react-icons/md';`,
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
          d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z"
          fill="currentColor"
        />
        <path
          d="M9.03 11.0299C7.66 12.3999 7.66 14.6099 9.03 15.9799C10.15 17.0999 11.83 17.2899 13.16 16.5699L15.04 18.4499L16.45 17.0399L14.57 15.1599C15.28 13.8299 15.1 12.1499 13.98 11.0299C12.61 9.65994 10.39 9.65994 9.03 11.0299ZM12.56 14.5599C11.97 15.1499 11.02 15.1499 10.44 14.5599C9.85 13.9699 9.85 13.0199 10.44 12.4399C11.03 11.8499 11.98 11.8499 12.56 12.4399C13.15 13.0299 13.15 13.9699 12.56 14.5599Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
