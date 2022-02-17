import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSouthEast } from '@aws-amplify/ui-react';` → `import { MdSouthEast } from 'react-icons/md';`
 */
export const IconSouthEast = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconSouthEast');
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
          d="M19 9H17V15.59L5.41 4L4 5.41L15.59 17H9V19H19V9Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
