import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSlowMotionVideo } from '@aws-amplify/ui-react';` → `import { MdSlowMotionVideo } from 'react-icons/md';`
 */
export const IconSlowMotionVideo = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSlowMotionVideo } from '@aws-amplify/ui-react'; → import { MdSlowMotionVideo } from 'react-icons/md';`,
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
          d="M13.05 9.7898L10 7.4998V16.4998L13.05 14.2098L16 11.9998L13.05 9.7898ZM13.05 9.7898L10 7.4998V16.4998L13.05 14.2098L16 11.9998L13.05 9.7898ZM13.05 9.7898L10 7.4998V16.4998L13.05 14.2098L16 11.9998L13.05 9.7898ZM11 4.0698V2.0498C8.99005 2.2498 7.16005 3.0498 5.68005 4.2598L7.10005 5.6898C8.21005 4.8298 9.54005 4.2498 11 4.0698ZM5.69005 7.0998L4.26005 5.6798C3.05005 7.1598 2.25005 8.9898 2.05005 10.9998H4.07005C4.25005 9.5398 4.83005 8.2098 5.69005 7.0998ZM4.07005 12.9998H2.05005C2.25005 15.0098 3.05005 16.8398 4.26005 18.3198L5.69005 16.8898C4.83005 15.7898 4.25005 14.4598 4.07005 12.9998V12.9998ZM5.68005 19.7398C7.16005 20.9498 9.00005 21.7498 11 21.9498V19.9298C9.54005 19.7498 8.21005 19.1698 7.10005 18.3098L5.68005 19.7398V19.7398ZM22 11.9998C22 17.1598 18.08 21.4198 13.05 21.9498V19.9298C16.97 19.4098 20 16.0498 20 11.9998C20 7.9498 16.97 4.5898 13.05 4.0698V2.0498C18.08 2.5798 22 6.8398 22 11.9998Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
