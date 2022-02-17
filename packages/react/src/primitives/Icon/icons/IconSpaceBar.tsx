import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSpaceBar } from '@aws-amplify/ui-react';` → `import { MdSpaceBar } from 'react-icons/md';`
 */
export const IconSpaceBar = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconSpaceBar');
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
        <path d="M18 9V13H6V9H4V15H20V9H18Z" fill="currentColor" />
      </svg>
    </View>
  );
};
