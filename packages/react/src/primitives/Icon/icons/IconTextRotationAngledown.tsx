import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconTextRotationAngledown } from '@aws-amplify/ui-react';` → `import { MdTextRotationAngledown } from 'react-icons/md';`
 */
export const IconTextRotationAngledown = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconTextRotationAngledown');
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
          d="M15 21V16.76L13.59 18.17L4.39 8.98L2.98 10.39L12.17 19.58L10.76 21H15ZM11.25 8.48L14.79 12.02L13.87 14.21L15.35 15.69L19.77 4.55L18.71 3.5L7.57 7.92L9.06 9.4L11.25 8.48ZM17.84 5.43L15.61 10.3L12.97 7.66L17.84 5.43V5.43Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
