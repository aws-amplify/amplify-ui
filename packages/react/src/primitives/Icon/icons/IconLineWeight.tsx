import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconLineWeight } from '@aws-amplify/ui-react';` → `import { MdLineWeight } from 'react-icons/md';`
 */
export const IconLineWeight = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconLineWeight');
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
          d="M3 17H21V15H3V17ZM3 20H21V19H3V20ZM3 13H21V10H3V13ZM3 4V8H21V4H3Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
