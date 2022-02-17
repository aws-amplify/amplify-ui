import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconNorthWest } from '@aws-amplify/ui-react';` → `import { MdNorthWest } from 'react-icons/md';`
 */
export const IconNorthWest = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconNorthWest');
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
          d="M5 15H7V8.41L18.59 20L20 18.59L8.41 7H15V5H5V15Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
