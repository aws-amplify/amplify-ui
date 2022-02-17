import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconStayPrimaryLandscape } from '@aws-amplify/ui-react';` → `import { MdStayPrimaryLandscape } from 'react-icons/md';`
 */
export const IconStayPrimaryLandscape = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconStayPrimaryLandscape');
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
          d="M1.01 7L1 17C1 18.1 1.9 19 3 19H21C22.1 19 23 18.1 23 17V7C23 5.9 22.1 5 21 5H3C1.9 5 1.01 5.9 1.01 7ZM19 7V17H5V7H19Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
