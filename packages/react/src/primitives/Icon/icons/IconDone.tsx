import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconDone } from '@aws-amplify/ui-react';` → `import { MdDone } from 'react-icons/md';`
 */
export const IconDone = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconDone');
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
          d="M9 16.2001L4.8 12.0001L3.4 13.4001L9 19.0001L21 7.0001L19.6 5.6001L9 16.2001Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
