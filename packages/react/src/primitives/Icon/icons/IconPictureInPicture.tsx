import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPictureInPicture } from '@aws-amplify/ui-react';` → `import { MdPictureInPicture } from 'react-icons/md';`
 */
export const IconPictureInPicture = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconPictureInPicture');
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
          d="M19 7H11V13H19V7ZM17 11H13V9H17V11ZM21 3H3C1.9 3 1 3.9 1 5V19C1 20.1 1.9 20.98 3 20.98H21C22.1 20.98 23 20.1 23 19V5C23 3.9 22.1 3 21 3ZM21 19.01H3V4.98H21V19.01V19.01Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
