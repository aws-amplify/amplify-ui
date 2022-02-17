import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconAirplay } from '@aws-amplify/ui-react';` → `import { MdAirplay } from 'react-icons/md';`
 */
export const IconAirplay = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconAirplay');
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
        <path d="M6 22H18L12 16L6 22Z" fill="currentColor" />
        <path
          d="M21 3H3C1.9 3 1 3.9 1 5V17C1 18.1 1.9 19 3 19H7V17H3V5H21V17H17V19H21C22.1 19 23 18.1 23 17V5C23 3.9 22.1 3 21 3Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
