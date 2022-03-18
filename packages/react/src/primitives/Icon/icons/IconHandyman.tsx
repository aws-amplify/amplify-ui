import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconHandyman } from '@aws-amplify/ui-react';` → `import { MdHandyman } from 'react-icons/md';`
 */
export const IconHandyman = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconHandyman } from '@aws-amplify/ui-react'; → import { MdHandyman } from 'react-icons/md';`,
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
          d="M21.6698 18.1701L16.3698 12.8701H15.3798L12.8398 15.4101V16.4001L18.1398 21.7001C18.5298 22.0901 19.1598 22.0901 19.5498 21.7001L21.6698 19.5801C22.0598 19.2001 22.0598 18.5601 21.6698 18.1701ZM18.8398 19.5901L14.5998 15.3501L15.3098 14.6401L19.5498 18.8801L18.8398 19.5901Z"
          fill="currentColor"
        />
        <path
          d="M17.34 10.19L18.75 8.78L20.87 10.9C22.04 9.73 22.04 7.83 20.87 6.66L17.33 3.12L15.92 4.53V1.71L15.22 1L11.68 4.54L12.39 5.25H15.22L13.81 6.66L14.87 7.72L11.98 10.61L7.85 6.48V5.06L4.83 2.04L2 4.87L5.03 7.9H6.44L10.57 12.03L9.72 12.88H7.6L2.3 18.18C1.91 18.57 1.91 19.2 2.3 19.59L4.42 21.71C4.81 22.1 5.44 22.1 5.83 21.71L11.13 16.41V14.29L16.28 9.14L17.34 10.19ZM9.36 15.34L5.12 19.58L4.41 18.87L8.65 14.63L9.36 15.34Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
