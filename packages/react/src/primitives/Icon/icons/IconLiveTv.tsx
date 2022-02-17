import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconLiveTv } from '@aws-amplify/ui-react';` → `import { MdLiveTv } from 'react-icons/md';`
 */
export const IconLiveTv = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconLiveTv');
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
          d="M9 10V18L16 14L9 10ZM21 6H13.42L16.71 2.71L16 2L12 6H11.97L7.97 2L7.28 2.71L10.56 6H3C1.9 6 1 6.9 1 8V20C1 21.1 1.9 22 3 22H21C22.1 22 23 21.1 23 20V8C23 6.9 22.1 6 21 6ZM21 20H3V8H21V20Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
