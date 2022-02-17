import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconPause } from '@aws-amplify/ui-react';` → `import { MdPause } from 'react-icons/md';`
 */
export const IconPause = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconPause');
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
        <path d="M6 19H10V5H6V19ZM14 5V19H18V5H14Z" fill="currentColor" />
      </svg>
    </View>
  );
};
