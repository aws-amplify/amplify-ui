import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPhoneCallback } from '@aws-amplify/ui-react';` → `import { MdPhoneCallback } from 'react-icons/md';`
 */
export const IconPhoneCallback = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconPhoneCallback } from '@aws-amplify/ui-react'; → import { MdPhoneCallback } from 'react-icons/md';`,
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
          d="M20 15.5098C18.76 15.5098 17.55 15.3098 16.43 14.9398C16.33 14.8998 16.22 14.8898 16.12 14.8898C15.86 14.8898 15.61 14.9898 15.41 15.1798L13.21 17.3798C10.38 15.9298 8.06 13.6198 6.62 10.7898L8.82 8.58982C9.1 8.30982 9.18 7.91982 9.07 7.56982C8.7 6.44982 8.5 5.24982 8.5 3.99982C8.5 3.44982 8.05 2.99982 7.5 2.99982H4C3.45 2.99982 3 3.44982 3 3.99982C3 13.3898 10.61 20.9998 20 20.9998C20.55 20.9998 21 20.5498 21 19.9998V16.5098C21 15.9598 20.55 15.5098 20 15.5098V15.5098ZM5.03 4.99982H6.53C6.6 5.88982 6.75 6.75982 6.99 7.58982L5.79 8.78982C5.38 7.58982 5.12 6.31982 5.03 4.99982V4.99982ZM19 18.9698C17.68 18.8798 16.41 18.6198 15.2 18.2198L16.39 17.0298C17.24 17.2698 18.11 17.4198 18.99 17.4798V18.9698H19ZM18 8.99982H15.41L20.43 3.97982L19.02 2.56982L14 7.58982V4.99982H12V10.9998H18V8.99982Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
