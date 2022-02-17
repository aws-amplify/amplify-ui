import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconWest } from '@aws-amplify/ui-react';` → `import { MdWest } from 'react-icons/md';`
 */
export const IconWest = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconWest');
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
          d="M9 19L10.41 17.59L5.83 13H22V11H5.83L10.42 6.41L9 5L2 12L9 19Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
